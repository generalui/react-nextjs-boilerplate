import sgMail, { MailDataRequired, ResponseError } from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export default async function sendEmailNotification(msg: MailDataRequired) {
	if (process.env.EMAIL_SENDING_IS_ENABLED === 'false')
		return { statusCode: 200, message: 'Email sending is disabled' }
	else {
		return await sgMail
			.send(msg)
			.then((response) => {
				return response[0]
			})
			.catch((error) => {
				console.log('sendEmailNotification ~ error', error)
				return error as ResponseError
			})
	}
}
