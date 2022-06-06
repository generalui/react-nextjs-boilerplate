import path from 'path'

interface File {
	base64: string
	originalName: string
	publicId: string
	mimeType: string
}

type ParseFile = (file: Express.Multer.File) => File

const formatName = (originalName: string) => {
	const extension = path.extname(originalName)
	return originalName
		.trim()
		.replace(extension, '')
		.replace(/[^0-9a-zA-Z ]/g, '')
		.replace(/ /g, '_')
}

export const parseFile: ParseFile = (file) => {
	const { mimetype, originalname, buffer, size } = file
	const base64 = `data:${mimetype};base64,${buffer.toString('base64')}`
	const publicId = `${process.env.CLOUD_FOLDER_NAME}/${formatName(originalname)}`

	return { base64, originalName: originalname, publicId, mimeType: mimetype }
}
