// TODO:  rename this file to be more clear about what it is doing
import { upload } from './media'
import { parseFile } from './parseFile'

export type UploadToCloudinaryReturn = { name: string; url: string; fileType: string }

type UploadToCloudinary = (
	file?: Express.Multer.File
) => Promise<UploadToCloudinaryReturn | undefined>

/**
 * UploadToCloudinary
 *
 * Takes a file from mutler.
 * Attempts to upload to cloudinary and return prisma formated object.
 *
 * @returns object to pass to prisma to create a connected document model
 */
export const uploadToCloudinary: UploadToCloudinary = async (file) => {
	if (!file) return undefined

	// Add data type to base64 string
	const { base64, publicId, originalName, mimeType } = await parseFile(file as Express.Multer.File)

	// Upload (to cloudinary)
	const { secure_url } = await upload({ file: base64, publicId })

	return { name: originalName, url: secure_url, fileType: mimeType }
}
