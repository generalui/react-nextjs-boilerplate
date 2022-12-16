import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
	secure: true
})

export interface UploadArgs {
	file: string
	resourceType?: 'image' | 'pdf' | 'auto'
	publicId?: string
	overwrite?: boolean
}

export const upload = ({
	file,
	resourceType = 'auto',
	publicId = `${process.env.CLOUD_FOLDER_NAME}/${new Date().getTime().toString()}`,
	overwrite = false
}: UploadArgs) => {
	const options = { resource_type: resourceType, public_id: publicId, overwrite }

	return process.env.CLOUDINARY_ENABLED === 'true'
		? cloudinary.uploader.upload(file, options)
		: new Promise((resolve) => resolve({ secure_url: '#' }))
}
