import { currentUserIncludes } from 'models/Users/includes'
import type { NextApiRequest } from 'next'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { prisma } from 'utils/api/prisma'

export const getCurrentUser = (req: NextApiRequest) => {
	return async () => {
		const session = await getSessionFromReq(req)

		const currentUser = await prisma.user.findUnique({
			where: {
				id: session.userId
			},
			...currentUserIncludes
		})

		if (!currentUser) throw Error('No current user')

		return currentUser
	}
}
