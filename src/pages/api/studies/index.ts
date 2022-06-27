// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Study, StudyStatus } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleQuery } from 'utils/api/handleQuery'
import { upload } from 'utils/api/media'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

// Get a list of studies
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const studiesQuery = async () =>
		await prisma.study.findMany({
			include: {
				users: {
					include: {
						user: true
					}
				}, // Include all users in the returned object,
				image: true
			},
			orderBy: [
				{
					submissionDate: 'desc'
				}
			]
		})

	handleQuery<Study[]>({
		req,
		res,
		model: 'study',
		query: studiesQuery
	})
})

// Create a new study
apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)

	const studyQuery = async () => {
		const { title, coordinator, endDate, description, image } = req.body

		// Upload (to cloudinary)
		const { secure_url, public_id } = await upload({ file: image })

		return await prisma.study.create({
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
	}

	handleQuery<Study>({
		req,
		res,
		session,
		model: 'study',
		query: studyQuery
	})
})

export default apiRoute
