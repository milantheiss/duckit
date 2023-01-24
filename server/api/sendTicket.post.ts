import nodemailer from "nodemailer";
const config = useRuntimeConfig();

const transporter = nodemailer.createTransport({
	host: config.MAILHOST,
	port: config.MAILPORT,
	auth: {
		user: config.MAILUSER,
		pass: config.MAILPASSWORD,
	},
});

export default defineEventHandler(async (event) => {
	const body = (await readBody(event)) as EmailBody;

	const html = (ticketCodes: string[]) => {
		let html =
			"<html><body><h1>Tickets für die LGS Vofi am 03.02.2023</h1><p>Hier sind deine Codes. Bitte halte deinen QR Code und deinen Ausweis für die Einlasskontrolle bereit.</p><p>Wenn du noch nicht volljährig bist benötigst du einen Mutti Zettel.</p><p>Den QR Code findest du im Anhang dieser E-Mail oder du kannst ihn dir auf unser Website generieren lassen.</br>(Klicke einfach auf den Code)</p>";
		ticketCodes.forEach((ticketCode: string) => {
			html += `<p><a href="https://localhost:3000/?ticketCode=${ticketCode}">🎟️ <span id="ticket">${ticketCode}</span></a></p>`;
		});
        html += "<p>Viel Spaß </p><p id='footer'>Bitte antworte nicht auf diese E-Mail. Du kannst uns über <a href='mailto:contact@lgs-abi2023.de'>contact@lgs-abi2023.de</a> oder auf Instagram <a href='https://www.instagram.com/vofis_abi2023/'>@vofis_abi2023</a></p></body><style>p {font-size: 1.2rem;} a {text-decoration: none;} #ticket:hover {text-decoration: underline;} #footer {font-size: 1.0rem;}</style></html>"
		return html;
	};

	const message = (ticketCodes: string[]) => {
		let text = "Hier sind deine Tickets für die LGS Vofi am 03.02.2023:\n";
		ticketCodes.forEach((ticketCode: string) => {
			text += `${ticketCode}\n`;
		});
		return text;
	};

	const sendMail = async (data: EmailBody) => {
		const mail = await transporter.sendMail({
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
