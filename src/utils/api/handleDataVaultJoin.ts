import { StudyDataType } from '@prisma/client'
import { UploadToCloudinaryReturn, uploadToCloudinary } from './uploadToCloudinary'

// TODO: merge this logic with handleAvatarJoin and handleDocumentationJoin
type DataVaultQuery = {
	dataVault: {
		create: {
			document: {
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
			dataType: StudyDataType
		}[]
	}
}
// TODO: this is very similar to handleAvatarJoin and handleDataVaultJoin so we should probably merge them
type HandleDataVaultJoin = (
	dataVault: Express.Multer.File[] | undefined,
	dataType: StudyDataType,
	userId: string
) => Promise<DataVaultQuery | undefined>

/**
 * HandleAvatarJoin
 *
 * Takes a file from multer and a record (either)
 * Attempts to upload to cloudinary and return prisma formatted object.
 * Creates an object to append to a query that upserts the element in the join table from
 * User or Study to documents
 *
 * @returns object to pass to prisma to create a connected document model
 */
export const handleDataVaultJoin: HandleDataVaultJoin = async (files, dataType, userId) => {
	// Attempt upload file to cloudinary
	if (!files?.length) return undefined

	const cloudinaryDataVaultValues: UploadToCloudinaryReturn[] = (await (
		await Promise.all(files.map(uploadToCloudinary))
	).filter((file) => file !== undefined)) as UploadToCloudinaryReturn[]

	// const cloudinaryImage = await uploadToCloudinary(files)
	// Do nothing if no new document was uploaded
	if (!cloudinaryDataVaultValues) return undefined

	// The update / create on the image
	// cloudinaryDataVaultValues
	const dataVault: DataVaultQuery = {
		dataVault: {
			create: cloudinaryDataVaultValues.map((doc) => ({
				document: {
					create: {
						...doc,
						uploadedBy: {
							connect: {
								id: userId
							}
						}
					}
				},
				dataType
			}))
		}
	}

	return dataVault
}
