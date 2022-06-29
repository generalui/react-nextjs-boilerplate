// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { upload } from 'utils/api/media'
import { prisma } from 'utils/api/prisma'
import { getCombinedString } from 'utils/text'

const apiRoute = connect()

// Get a study by ID
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

// Update study by ID
apiRoute.patch(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const studyId = getCombinedString(req.query.studyId)
		const session = await getSessionFromReq(req)

		// Extract body values that need transformation
		const { endDate, image, ...simpleBody } = req.body

		// Remove values that don't belong in the database
		// delete simpleBody.coordinator

		let imageUpdate

		// Upload to Cloudinary if this is a new image
		if (image?.startsWith('data:')) {
			const { secure_url, public_id } = await upload({ file: image })

			imageUpdate = {
				image: {
					create: {
						name: public_id,
						url: secure_url,
						fileType: 'mimeType',
						uploadedBy: {
							connect: {
								id: session.userId
							}
						}
					}
				}
			}
		}

		const study = await prisma.study.update({
			where: {
				id: studyId
			},
			data: {
				...simpleBody,
				endDate: endDate ? new Date(endDate) : undefined,
				...imageUpdate
			}
		})

		res.status(200).json(study)
	} catch (error) {
		res.status(400).json({ message: error })
	}
})

export default apiRoute
