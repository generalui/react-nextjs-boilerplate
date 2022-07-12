import { Study } from 'types/Study'
import { User } from 'types/User'
import { uploadToCloudinary } from './uploadToCloudinary'

type ImageInput = {
	name: string
	url: string
	fileType: string
	uploadedBy: {
		connect: {
			id: string
		}
	}
}

type AvatarInput = {
	image: {
		create: ImageInput
	}
}

type UpsertFileInput = {
	image: {
		create: AvatarInput
	}
}

type HandleAvatarJoin = (
	file: Express.Multer.File | undefined,
	userId: string
) => Promise<UpsertFileInput | undefined>

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
export const handleAvatarJoin: HandleAvatarJoin = async (file, userId) => {
	// Attempt upload file to cloudinary
	const cloudinaryImage = await uploadToCloudinary(file)
	// Do nothing if no new document was uploaded
	if (!cloudinaryImage) return undefined

	// The update / create on the image
	const imageUpdate: ImageInput = {
		...cloudinaryImage,
		uploadedBy: {
			connect: {
				id: userId
			}
		}
	}

	// Upsert the actual image on the join table
	const upsertImage: AvatarInput = {
		image: {
			create: imageUpdate
		}
	}

	// Image join on the user / study
	const upsertAvatar: UpsertFileInput = {
		image: {
			create: upsertImage
		}
	}

	// Return query object
	return upsertAvatar
}