import fs from 'fs'
import path from 'path'

interface ParsedFile {
	base64: string
	originalName: string
	publicId: string
	mimeType: string
}

type ParseFile = (file: Express.Multer.File) => Promise<ParsedFile>

// function getBase64(file: Express.Multer.File) {
// 	return new Promise((resolve, reject) => {
// 		const reader = new FileReader()
// 		reader.readAsDataURL(file.buffer)
// 		reader.onload = () => resolve(reader.result)
// 		reader.onerror = (error) => reject(error)
// 	})
// }

const formatName = (originalName: string) => {
	const extension = path.extname(originalName)
	return originalName
		.trim()
		.replace(extension, '')
		.replace(/[^0-9a-zA-Z ]/g, '')
		.replace(/ /g, '_')
}

export const parseFile: ParseFile = async (file) => {
	const { mimetype, originalname, path } = file

	const fileContents = fs.readFileSync(path, { encoding: 'base64' })

	const base64 = `data:${mimetype};base64,${fileContents}`
	const publicId = `${process.env.CLOUD_FOLDER_NAME}/${formatName(originalname)}`

	return { base64, originalName: originalname, publicId, mimeType: mimetype }
}
