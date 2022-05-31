import { NextApiRequest, NextApiResponse } from 'next'
import { DocumentOptions, upload } from 'utils/api/media'
import { prisma } from 'utils/api/prisma'

const documentName = 'https://placekitten.com/200/300'
const options: DocumentOptions = {
	resourceType: 'image',
	overwrite: false
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const cloudinaryResponse = await upload(documentName, options)
			const { original_filename, secure_url, resource_type } = cloudinaryResponse
			const document = await prisma.document.create({
				data: {
					name: original_filename,
					url: secure_url,
					resourceType: resource_type,
					userId: 'cl3urk98400008nojg2syb26r' // CHANGE THIS ID!!
				}
			})
			console.log('document: ', document)
			res.status(200).json({ document })
		} catch (error) {
			res.status(400).json({ message: error })
		}
	} else {
		res.status(400).json({ message: 'That request does not exist' })
	}
}

// error codes (pdf, jpg, png)
// Automatic document options
// Save in postgres
// Upload from frontend
// convert to data buffer or whatever
