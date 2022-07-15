import { UploadToCloudinaryReturn, uploadToCloudinary } from './uploadToCloudinary'

// TODO: merge this logic with handleAvataJoin
type DocumentQuery = {
	documentation: {
		create: {
			name: string
			url: string
			fileType: string
			uploadedBy: {
				connect: {
					id: string
				}
			}
		}[]
	}
}

type HandleDocumentationJoin = (
	documentation: Express.Multer.File[] | undefined,
	userId: string
) => Promise<DocumentQuery | undefined>

/**
 * HandleAvatarJoin
 *
 * Takes a file from mutler and a record (either)
 * Attempts to upload to cloudinary and return prisma formated object.
 * Creates an object to append to a query that upserts the element in the join table from
 * User or Study to documents
 *
 * @returns object to pass to prisma to create a connected document model
 */
export const handleDocumentationJoin: HandleDocumentationJoin = async (files, userId) => {
	// Attempt upload file to cloudinary
	if (!files?.length) return undefined

	const cloudinaryDocumentation: UploadToCloudinaryReturn[] = (await (
		await Promise.all(files.map(uploadToCloudinary))
	).filter((file) => file !== undefined)) as UploadToCloudinaryReturn[]

	// const cloudinaryImage = await uploadToCloudinary(files)
	// Do nothing if no new document was uploaded
	if (!cloudinaryDocumentation) return undefined

	// The update / create on the image
	// cloudinaryDocumentation
	const documentation: DocumentQuery = {
		documentation: {
			create: cloudinaryDocumentation.map((doc) => ({
				...doc,
				uploadedBy: {
					connect: {
						id: userId
					}
				}
			}))
		}
	}

	return documentation
}
