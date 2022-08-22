import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { User } from 'types/User'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleAvatarJoin } from 'utils/api/handleAvatarJoin'
import { handleQuery } from 'utils/api/handleQuery'
import { multer } from 'utils/api/multer'
import { prisma } from 'utils/api/prisma'

export { config } from 'utils/api/multer'

/**
 * Api setup for uploading documents
 *
 * Reference tutorial: https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
 * Multer reference: https://github.com/expressjs/multer#readme
 */
const apiRoute = connect()

// Middleware processing FormData to file
apiRoute.use(multer.single('image'))

const includes = {
	include: {
		image: {
			include: {
				image: true
			}
		},
		participant: {
			include: {
				user: true
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
