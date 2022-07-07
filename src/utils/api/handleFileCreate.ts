// TODO:  rename this file to be more clear about what it is doing
import { upload } from './media'
import { parseFile } from './parseFile'

type CreateFileInput = {
	create: {
		name: string
		url: string
		fileType: string
		uploadedBy: {
			connect: {
				id: string
			}
		}
	}
}

type HandleFileCreate = (
	file: Express.Multer.File,
	userId: string
) => Promise<CreateFileInput | undefined>

/**
 * handleFileCreate
 *
 * Takes a file from mutler and a user id from the request session.
 * Attempts to upload to cloudinary and return prisma formated object.
 *
 * @returns object to pass to prisma to create a connected document model
 */
export const handleFileCreate: HandleFileCreate = async (file, userId) => {
	if (!file) return undefined

	// Add data type to base64 string
	const { base64, publicId, originalName } = parseFile(file)

	// Upload (to cloudinary)
	const { secure_url } = await upload({ file: base64, publicId })

	return {
		create: {
			name: originalName,
			url: secure_url,
			fileType: 'mimeType',
			uploadedBy: {
				connect: {
					id: userId
				}
			}
		}
	}
}
