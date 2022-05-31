import { NextApiRequest, NextApiResponse } from 'next'
import { DocumentOptions, upload } from 'utils/api/media'

const documentName = 'https://placekitten.com/200/300'
const options: DocumentOptions = {
	resourceType: 'image',
	overwrite: false
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const cloudinaryResponse = await upload(documentName, options)
			console.log('cloudinaryResponse: ', cloudinaryResponse)
		} catch (error) {
			console.log('error: ', error)
			res.status(400).json({ message: error })
		}
	} else {
		console.log('another request')
	}
}
