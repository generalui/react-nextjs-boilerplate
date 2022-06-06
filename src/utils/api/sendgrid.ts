import sgMail, { MailDataRequired } from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

type ContentType = {
	type: string
	value: string
}

export type SendGridMsg = {
	to: string
	from: string
	subject: string
	html: string
	content: ContentType[]
}

export default function sendEmailNotification(msg: MailDataRequired) {
	return sgMail
		.send(msg)
		.then((response) => {
			console.log(response[0].statusCode)
			console.log(response[0].headers)
		})
		.catch((error) => {
			console.error(error)
		})
}
