import sgMail, { MailDataRequired, ResponseError } from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export default function sendEmailNotification(msg: MailDataRequired) {
	return sgMail
		.send(msg)
		.then((response) => {
			return response[0]
		})
		.catch((error) => {
			return error as ResponseError
		})
}
