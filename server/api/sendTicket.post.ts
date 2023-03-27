import nodemailer from "nodemailer";
import { jsPDF } from "jspdf";

// @ts-ignore
import QRCode from "qrcode";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	const transporter = nodemailer.createTransport({
		// @ts-ignore
		host: config.SMTP_HOST,
		port: config.SMTP_PORT,
		auth: {
			user: config.SMTP_USER,
			pass: config.SMTP_PASSWORD,
		},
	});

	const body = (await readBody(event)) as EmailBody;

	const html = (ticketCodes: string[]) => {
		let html =
			"<html><head><meta charset='utf-8'></head><body><h2>Ticket für die LGS Abi Feier am 07.07.2023</h2><p>Bitte halte deinen QR Code für die Einlasskontrolle bereit.</p><p>Den QR Code findest du im Anhang dieser E-Mail oder du kannst ihn dir auf unserer Website generieren lassen. <br>(Klicke einfach auf den Code)</p>";
		ticketCodes.forEach((ticketCode: string) => {
			html += `<p><a href="https://lgs-abi2023.de/ticket?code=${ticketCode}">🎟️ <span id="ticket">${ticketCode}</span></a></p>`;
		});
		html +=
			"<p>Viel Spaß</p><p id='footer'>Diese E-Mail wurde automatisch generiert. Bitte antworte nicht auf diese E-Mail.<br>Bei Fragen kannst du uns auf Instagram <a href='https://www.instagram.com/lgs_vofis2023/'>@lgs_vofis2023</a> erreichen.</p></body><style>p {font-size: 1.2rem;} a {text-decoration: none;} #ticket:hover {text-decoration: underline;} #footer {font-size: 1.0rem;}</style></html>";
		return html;
	};

	const message = (ticketCodes: string[]) => {
		let text = "Hier sind deine Tickets für die LGS Abi Feier am 07.07.2023:\n";
		text += "Bitte halte deinen QR Code bereit.\n";
		text += "Deine Ticketcodes:\n";
		ticketCodes.forEach((ticketCode: string) => {
			text += `${ticketCode}\n`;
		});
		text +=
			"Den QR Code findest du im Anhang dieser Email oder du kannst dir den QR Code auf unserer Website mit den Ticket Codes generieren lassen.\n";
		text += "https://lgs-abi2023.de\n";
		text += "Muttizettel: https://muttizettel.net/\n";
		text += "Viel Spaß\n";
		text +=
			"Diese E-Mail wurde automatisch generiert. Bitte antworte nicht auf diese E-Mail. Bei Fragen kannst du uns auf Instagram @lgs_vofis2023 erreichen.";
		return text;
	};

	const sendMail = async (data: EmailBody):Promise<SMTPTransport.SentMessageInfo> => {
		const attachments = await data.ticketCodes.map(async (ticketCode: string) => {
			return { path: await generatePDF(ticketCode) };
		});

		return await transporter.sendMail({
			from: "LGS Abi Feier Ticket <noreply@lgs-abi2023.de>",
			to: data.email,
			subject: "Deine Ticket für die LGS Abi Feier am 07.07.2023",
			text: message(data.ticketCodes),
			html: html(data.ticketCodes),
			attachments: await Promise.all(attachments),
		});
	};

	try {
		const mail = await sendMail(isValid(body));
	
		const ok = mail.rejected.length === 0;
		console.log(mail.response);
	
		return { ok: ok, error: ok ? "" : mail.response };
	} catch (e) {
		
		return { ok: false, error: e };
	}
});

interface EmailBody {
	email: string;
	ticketCodes: string[];
}

function isValid(body: EmailBody): EmailBody {
	const normalizeEmail = (email: string) => {
		const split: string[] = email.split("@");
		return [split[0], split[1].toLowerCase()].join("@");
	};

	const EMAIL_REGEX =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!body.email.match(EMAIL_REGEX)) {
		throw new Error("Email is not valid.");
	}
	if (typeof body.ticketCodes === "undefined" || body.ticketCodes.length === 0) {
		throw new Error("No Ticketcode provided.");
	}

	return {
		email: normalizeEmail(body.email),
		ticketCodes: body.ticketCodes,
	};
}

async function generatePDF(ticketCode: string) {
	const qrcode = await QRCode.toDataURL(ticketCode);

	const registerFont = (pdf: jsPDF, fontString: string, fontName: string) => {
		pdf.addFileToVFS(`${fontName}.ttf`, fontString);
		pdf.addFont(`${fontName}.ttf`, fontName, "normal");
	};

	const pdf = new jsPDF({
		orientation: "portrait",
		unit: "mm",
		format: "a5",
	});

	//Import Fonts von txt --> Findet file nicht
	const ubuntuBold = await (await fetch(`https://gist.githubusercontent.com/milantheiss/8b74605ce4f9af7c0b600ff376bdf269/raw/Ubuntu-Bold`)).text();
	const ubuntuMedium = await (
		await fetch(`https://gist.githubusercontent.com/milantheiss/4223031336767ba0a6b839435a8de3e5/raw/Ubuntu-Regular`)
	).text();
	const ubuntuRegular = await (
		await fetch(`https://gist.githubusercontent.com/milantheiss/b76fa6ff9cec5641247cd378d8ebb7e3/raw/Ubuntu-Medium`)
	).text();

	registerFont(pdf, ubuntuRegular, "Ubuntu-Regular");
	registerFont(pdf, ubuntuBold, "Ubuntu-Bold");
	registerFont(pdf, ubuntuMedium, "Ubuntu-Medium");

	pdf.addImage(qrcode, "png", 25, 70.14, 98, 98);

	pdf.setFont("Ubuntu-Bold").setFontSize(25).text("Ticket - LGS Abi Feier", 28.872, 21.844);

	const calIcon = await (await fetch("https://gist.githubusercontent.com/milantheiss/1c3e70fa8ad1890b4458acc5a64fc87b/raw/calendar_icon")).text();

	pdf.setFont("Ubuntu-Regular").setFontSize(18).addImage(calIcon, "PNG", 25.169, 32, 9, 9).text("Wann? Am 07.07.2023", 39.169, 39).text("Einlass ab 22:30 Uhr", 60.186, 47);

	const pushpinIcon = await (await fetch("https://gist.githubusercontent.com/milantheiss/9b8201b82c6777cf29263e9596bf867a/raw/pushpin_icon")).text();

	pdf.addImage(pushpinIcon, "PNG", 25.169, 49.072, 9, 9).text("Wo? Römerhalle Dieburg",  39.169, 55)
	.text("In d. Altstadt 5, Dieburg", 53.657, 63);

	pdf
		.setFont("Ubuntu-Bold")
		.setFontSize(30)
		.textWithLink(`${ticketCode}`, 54, 173.213, { url: `https://lgs-abi2023.de/ticket?code=${ticketCode}` });

	return pdf.output("datauristring");
}
