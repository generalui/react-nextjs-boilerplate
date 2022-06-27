// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

// Get a study by id
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { studyId } = req.query
		const study = await prisma.study.findUnique({
			where: {
				id: studyId as string
			},
			include: {
				users: {
					include: {
						user: true
					}
				},
				image: true
			}
		})

		res.status(200).json(study)
	} catch (error) {
		res.status(400).json({ message: error })
	}
})

export default apiRoute
