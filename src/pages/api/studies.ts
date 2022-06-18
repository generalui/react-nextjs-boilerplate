// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StudyStatus } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const studies = await prisma.study.findMany({
		include: {
			users: true
		}
	})

	res.status(200).json(JSON.parse(JSON.stringify(studies)))
})

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { title, coordinator, endDate, description, image } = req.body
	console.log('~ image', image)

	// TODO: Upload image get url

	await prisma.study.create({
		data: {
			title,
			endDate: new Date(endDate),
			description,
			status: StudyStatus.new,
			submissionDate: new Date(),
			users: {
				create: {
					user: {
						connect: {
							email: coordinator
						}
					}
				}
			}
		}
	})

	res.status(200).json({})
})

export default apiRoute
