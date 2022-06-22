// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StudyStatus } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { upload } from 'utils/api/media'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

// Get a list of studies
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const studies = await prisma.study.findMany({
		include: {
			users: {
				include: {
					user: true
				}
			}, // Include all users in the returned object,
			image: true
		}
	})

	res.status(200).json(JSON.parse(JSON.stringify(studies)))
})

// Create a new study
apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { title, coordinator, endDate, description, image } = req.body

	const session = await getSessionFromReq(req)

	// Upload (to cloudinary)
	const { secure_url, public_id } = await upload({ file: image })

	const study = await prisma.study.create({
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
			},
			image: {
				create: {
					name: public_id,
					url: secure_url,
					fileType: 'mimeType',
					uploadedBy: {
						connect: {
							id: session.userId as string
						}
					}
				}
			}
		},
		include: {
			users: {
				include: {
					user: true
				}
			}, // Include all users in the returned object
			image: true // Include image in the returned object
		}
	})

	res.status(200).json(study)
})

export default apiRoute
