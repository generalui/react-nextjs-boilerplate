import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export type SendGridMsg = {
	to: string
	from: string
	subject: string
	text: string
	html: string
}

export default function sendEmailNotification(msg: SendGridMsg) {
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
