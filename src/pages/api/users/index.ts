// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

// Get a list of users
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const studies = await prisma.user.findMany({
		orderBy: [
			{
				name: 'asc'
			}
		]
	})

	res.status(200).json(JSON.parse(JSON.stringify(studies)))
})

export default apiRoute
