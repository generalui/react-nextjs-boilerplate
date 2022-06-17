// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { title, coordinator, endDate, description } = req.body
	// await prisma.study.create({
	// 	data: {
	// 		title,
	// 		endDate,
	// 		description,
	//     users: [

	//     ]
	// 	}
	// })
})

export default apiRoute
