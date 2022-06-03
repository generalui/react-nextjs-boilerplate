import type { NextApiRequest, NextApiResponse } from 'next'
import sendEmailNotification from 'utils/api/sendgrid'

const msg = {
	to: 'vanessa.cnr97@gmail.com', // Change to your recipient
	from: 'vanessa@genui.com', // Change to your verified sender
	subject: 'Sending with SendGrid is Fun',
	text: 'and easy to do anywhere, even with Node.js',
	html: '<strong>and easy to do anywhere, even with Node.js</strong>'
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
