import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

// GET USER
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)
	const currentUserQuery = async () => {
		const currentUser = await prisma.user.findUnique({
			where: {
				id: session.userId
			}
			// include: { documents: true }
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
apiRoute.patch(async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)
	const updateCurrentUser = async () => {
		const { body } = req
		return await prisma.user.update({
			where: {
				id: session.userId
			},
			data: {
				name: body.name
			}
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
