import multer from 'multer'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { User } from 'types/User'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleAvatarJoin } from 'utils/api/handleAvatarJoin'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

/**
 * Api setup for uploading documents
 *
 * Reference tutorial: https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
 * Multer reference: https://github.com/expressjs/multer#readme
 */
const apiRoute = connect()

// Config multer to process files in memory
const uploadMiddleware = multer({
	storage: multer.memoryStorage()
})

// Middleware processing FormData to file
apiRoute.use(uploadMiddleware.single('file'))

const includes = {
	include: {
		image: {
			include: {
				image: true
			}
		}
	}
}
// GET USER
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)
	const currentUserQuery = async () => {
		const currentUser = await prisma.user.findUnique({
			where: {
				id: session.userId
			},
			...includes
		})

		if (!currentUser) throw Error('No current user')

		return currentUser
	}

	handleQuery<User>({
		req,
		res,
		model: 'currentUser',
		session,
		disableLog: true,
		query: currentUserQuery
	})
})

// UPDATE USER
apiRoute.patch(async (req: ApiRequestWithFile, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)

	const upsertImage = await handleAvatarJoin(req.file, session.userId)

	const updateCurrentUser = async () => {
		const { body } = req
		return await prisma.user.update({
			where: {
				id: session.userId
			},
			data: {
				name: body.name,
				...upsertImage
			},
			...includes
		})
	}

	handleQuery<User>({
		req,
		res,
		model: 'currentUser',
		session,
		query: updateCurrentUser
	})
})

export default apiRoute

// Disallow body parsing, consume as stream, for file upload
export const config = {
	api: {
		bodyParser: false
	}
}
