import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = await getSessionFromReq(req)

		const currentUser = await prisma.user.findUnique({
			where: {
				id: session.userId as string
			}
			// include: { documents: true }
		})

		res.status(200).json(currentUser)
	} catch (error) {
		res.status(400).json({ message: error })
	}
})

apiRoute.patch(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = await getSessionFromReq(req)
		const { body } = req
		const currentUserUpdate = await prisma.user.update({
			where: {
				id: session.userId as string
			},
			data: {
				name: body.name
			}
		})
		res.status(200).json(currentUserUpdate)
	} catch (error) {
		res.status(400).json({ message: error })
	}
})

export default apiRoute
