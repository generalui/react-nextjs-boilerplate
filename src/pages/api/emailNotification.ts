import { MailDataRequired } from '@sendgrid/mail'
import html from 'emailTemplates/email.hbs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import sendEmailNotification from 'utils/api/sendgrid'

const msg: MailDataRequired = {
	to: 'nr15002@ues.edu.sv', // Change to your recipient
	from: 'vanessa@genui.com', // Change to your verified sender
	subject: 'Sending with SendGrid is Fun',
	content: [
		{
			type: 'text/html',
			value: html()
		}
	]
}

const apiRoute = connect()

apiRoute.post(async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const response = await sendEmailNotification(msg)
		if ('statusCode' in response) {
			res.status(response.statusCode).json(response)
		} else {
			res.status(response.code).json(response)
		}
	} catch (error) {
		console.log('error: ', error)
	}
})

export default apiRoute
