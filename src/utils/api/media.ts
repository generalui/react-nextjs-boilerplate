import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
	secure: true
})

export interface UploadArgs {
	file: string
	resourceType?: 'image' | 'pdf'
	publicId?: string
	overwrite?: boolean
}

export const upload = ({
	file,
	resourceType = 'image',
	publicId = new Date().getTime().toString(),
	overwrite = false
}: UploadArgs) => {
	const options = { resourceType, publicId, overwrite }
	return cloudinary.uploader.upload(file, options, function (error, result) {
		console.log(result, error)
	})
}
