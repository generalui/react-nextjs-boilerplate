import { MailDataRequired } from '@sendgrid/mail'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import sendEmailNotification from 'utils/api/sendgrid'

const apiRoute = connect()

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { to, dynamicTemplateData } = req.body
		const msg: MailDataRequired = {
			to,
			from: 'vanessa@genui.com',
			templateId: 'd-9863054f11d845078e3736c0109b7c89',
			dynamicTemplateData
		}
		const response = await sendEmailNotification(msg)
		if ('statusCode' in response) {
			res.status(response.statusCode).json(response)
		} else {
			res.status(response.code).json(response)
		}
	} catch (error) {
		res.status(400).json({ message: error })
	}
})

export default apiRoute
