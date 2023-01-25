import nodemailer from "nodemailer";
const config = useRuntimeConfig();
import { jsPDF } from "jspdf";
import fs from "fs";
// @ts-ignore
import QRCode from "qrcode";

export default defineEventHandler(async (event) => {
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
			"<html><head><meta charset='utf-8'></head><body><h2>Tickets für die LGS Vofi am 03.02.2023</h2><p>Hier sind deine Codes. Bitte halte deinen QR Code und deinen Ausweis für die Einlasskontrolle bereit.</p><p>Wenn du noch nicht volljährig bist benötigst du auch einen <a href='https://muttizettel.net/'>Muttizettel</a>.</p><p>Den QR Code findest du im Anhang dieser E-Mail oder du kannst ihn dir auf unser Website generieren lassen.</br>(Klicke einfach auf den Code)</p>";
		ticketCodes.forEach((ticketCode: string) => {
			html += `<p><a href="https://lgs-abi2023.de/ticket?code=${ticketCode}">🎟️ <span id="ticket">${ticketCode}</span></a></p>`;
		});
		html +=
			"<p>Viel Spaß </p><p id='footer'>Diese E-Mail wurde automatisch generiert. Bitte antworte nicht auf diese E-Mail. Bei Fragen kannst du uns auf Instagram <a href='https://www.instagram.com/lgs_vofis2023/'>@lgs_vofis2023</a> erreichen.</p></body><style>p {font-size: 1.2rem;} a {text-decoration: none;} #ticket:hover {text-decoration: underline;} #footer {font-size: 1.0rem;}</style></html>";
		return html;
	};

	const message = (ticketCodes: string[]) => {
		let text = "Hier sind deine Tickets für die LGS Vofi am 03.02.2023:\n";
		text += "Bitte halte deinen QR Code und deinen Ausweis für die Einlasskontrolle bereit.\n";
		text += "Wenn du noch nicht volljährig bist benötigst du auch einen Mutti Zettel.\n";
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

	const sendMail = async (data: EmailBody) => {
		const attachments = await data.ticketCodes.map(async (ticketCode: string) => {
			return { path: await generatePDF(ticketCode) };
		});

		const mail = await transporter.sendMail({
			from: "LGS Vofi Tickets <noreply@lgs-abi2023.de>",
			to: data.email,
			subject: "Deine Tickets für die LGS Vofi am 03.02.2023",
			text: message(data.ticketCodes),
			html: html(data.ticketCodes),
			attachments: await Promise.all(attachments),
		});
	};

	await sendMail(isValid(body));

	return "Gesendet!";
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
	const ubuntuBold = fs.readFileSync("/fonts/Ubuntu-Bold.txt", "utf8");
	const ubuntuMedium = fs.readFileSync("/fonts/Ubuntu-Medium.txt", "utf8");
	const ubuntuRegular = fs.readFileSync("/fonts/Ubuntu-Regular.txt", "utf8");

	registerFont(pdf, ubuntuRegular, "Ubuntu-Regular");
	registerFont(pdf, ubuntuBold, "Ubuntu-Bold");
	registerFont(pdf, ubuntuMedium, "Ubuntu-Medium");

	pdf.addImage(qrcode, "png", 25, 70.14, 98, 98);

	pdf.setFont("Ubuntu-Bold").setFontSize(25).text("Ticket - LGS Vofi", 40, 21.844);

	let baseString = fs.readFileSync("/img/calendar_3d.png", "base64");
	const calIcon = "data:image/jpeg;base64," + baseString;

	pdf.setFont("Ubuntu-Regular").setFontSize(18).addImage(calIcon, "PNG", 19, 32, 9, 9).text("Wann? Am 03.02.2023 ab 20 Uhr", 33, 39);

	baseString = fs.readFileSync("/img/pushpin_3d.png", "base64");
	const pushpinIcon = "data:image/jpeg;base64," + baseString;

	pdf.addImage(pushpinIcon, "PNG", 19, 43, 9, 9).text("Wo? Am Sportplatz 3 - Altheim", 33, 48.928);

	baseString = fs.readFileSync("/img/warning_3d.png", "base64");
	const warningIcon = "data:image/jpeg;base64," + baseString;

	pdf
		.setFont("Ubuntu-Medium")
		.setFontSize(20)
		.addImage(warningIcon, "PNG", 19, 52, 9, 9)
		.text("Bitte halte dieses Ticket", 33, 59.475)
		.text("& dein Ausweis bei der ", 33, 67.475)
		.text("Einlasskontrolle bereit!", 33, 74.475);

	pdf
		.setFont("Ubuntu-Bold")
		.setFontSize(30)
		.textWithLink(`${ticketCode}`, 54, 173.213, { url: `https://lgs-abi2023.de/ticket?code=${ticketCode}` });

	return pdf.output("datauristring");
}
