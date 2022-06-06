import { MailDataRequired } from '@sendgrid/mail'
import html from 'emailTemplates/email.hbs'
import type { NextApiRequest, NextApiResponse } from 'next'
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

export default async function sendNotification(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const response = await sendEmailNotification(msg)
			console.log('response: ', response)
			res.status(202).json(response)
		} catch (error) {
			console.log('error: ', error)
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' })
	}
}
