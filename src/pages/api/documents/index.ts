import axios from 'axios'
import { v2 as cloudinary } from 'cloudinary'
import FormData from 'form-data'
import { NextApiRequest, NextApiResponse } from 'next'
import { DocumentOptions, upload } from 'utils/api/media'
import { prisma } from 'utils/api/prisma'

const documentName = 'https://c1.staticflickr.com/5/4390/36711883114_9d570cc2a4_b.jpg'
const options: DocumentOptions = {
	resourceType: 'image',
	overwrite: false
}

const signuploadwidget = () => {
	const timestamp = Math.round(new Date().getTime() / 1000).toString()

	const signature = cloudinary.utils.api_sign_request(
		{
			timestamp: timestamp,
			source: 'uw',
			folder: 'signed_upload_demo_uw'
		},
		process.env.API_SECRET as string
	)

	return { timestamp, signature }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { timestamp, signature } = signuploadwidget()
			const formData = new FormData()
			formData.append('file', req.body)
			formData.append('api_key', process.env.API_KEY as string)
			formData.append('timestamp', timestamp)
			formData.append('signature', signature)
			formData.append('eager', 'c_pad,h_300,w_400|c_crop,h_200,w_260')
			formData.append('folder', 'signed_upload_demo_form')
			const url = 'https://api.cloudinary.com/v1_1/dgzdosblk/auto/upload'
			const cloudinaryResponse = await axios.post(url, formData)

			console.log('cloudinaryResponse: ', cloudinaryResponse)
			// const { original_filename, secure_url, resource_type } = cloudinaryResponse
			// const document = await prisma.document.create({
			// 	data: {
			// 		name: original_filename,
			// 		url: secure_url,
			// 		resourceType: resource_type,
			// 		userId: 'cl3urk98400008nojg2syb26r' // CHANGE THIS ID!!
			// 	}
			// })
			// console.log('document: ', document)
			// res.status(200).json({ document })
		} catch (error) {
			console.log('error: ', error)
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
