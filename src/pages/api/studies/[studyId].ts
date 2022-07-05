// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StudyDataTypes } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { selectOptionsType } from 'types/index'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleQuery } from 'utils/api/handleQuery'
import { upload } from 'utils/api/media'
import { prisma } from 'utils/api/prisma'
import { getCombinedString } from 'utils/text'

const apiRoute = connect()

// Get a study by ID
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { studyId } = req.query
	const studyQuery = async () =>
		await prisma.study.findUnique({
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

	handleQuery({
		req,
		res,
		model: 'study',
		query: studyQuery
	})
})

// Update study by ID
apiRoute.patch(async (req: NextApiRequest, res: NextApiResponse) => {
	const studyId = getCombinedString(req.query.studyId)
	const session = await getSessionFromReq(req)

	// Extract body values that need transformation
	const { endDate, image, dataTypes: dt, ...simpleBody } = req.body

	const dataTypes: StudyDataTypes[] = dt.map(
		(dataType: selectOptionsType) => dataType.value as StudyDataTypes
	)

	// Remove values that don't belong in the database
	delete simpleBody.coordinator

	let imageUpdate: { image: { create: unknown } }

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

	const studyQuery = async () =>
		prisma.study.update({
			where: {
				id: studyId
			},
			data: {
				...simpleBody,
				endDate: endDate ? new Date(endDate) : undefined,
				dataTypes,
				...imageUpdate
			}
		})

	handleQuery({
		req,
		res,
		model: 'study',
		query: studyQuery
	})
})

export default apiRoute
