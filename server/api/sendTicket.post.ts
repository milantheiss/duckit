import nodemailer from "nodemailer";
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	const transporter = nodemailer.createTransport({
		// @ts-ignore
		host: config.SMTP_HOST,
		port: config.SMTP_POST,
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
        html += "<p>Viel Spaß </p><p id='footer'>Diese E-Mail wurde automatisch generiert. Bitte antworte nicht auf diese E-Mail. Bei Fragen kannst du uns auf Instagram <a href='https://www.instagram.com/abiball_lgs_2023/'>@abiball_lgs_2023</a> erreichen.</p></body><style>p {font-size: 1.2rem;} a {text-decoration: none;} #ticket:hover {text-decoration: underline;} #footer {font-size: 1.0rem;}</style></html>"
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
		text += "Den QR Code findest du im Anhang dieser Email oder du kannst dir den QR Code auf unserer Website mit den Ticket Codes generieren lassen.\n";
		text += "https://lgs-abi2023.de\n";
		text += "Muttizettel: https://muttizettel.net/\n"
		text += "Viel Spaß\n";
		text += "Diese E-Mail wurde automatisch generiert. Bitte antworte nicht auf diese E-Mail. Bei Fragen kannst du uns auf Instagram @abiball_lgs_2023 erreichen."
		return text;
	};

	const sendMail = async (data: EmailBody) => {
		const mail = await transporter.sendMail({
			from: "LGS Vofi Tickets <noreply@lgs-abi2023.de>",
			to: data.email,
			subject: "Deine Tickets für die LGS Vofi am 03.02.2023",
			text: message(data.ticketCodes),
			html: html(data.ticketCodes),
		});

		console.log("Message sent: %s", mail.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mail));
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
