import { v2 as cloudinary } from 'cloudinary'

export type DocumentOptions = {
	resourceType: 'image' | 'pdf'
	publicId?: string
	overwrite: boolean
}

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
	secure: true
})

export const upload = (documentName: string, options: DocumentOptions) => {
	return cloudinary.uploader.upload(documentName, options, function (error, result) {
		console.log(result, error)
	})
}
