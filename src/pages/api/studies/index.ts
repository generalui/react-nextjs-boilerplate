// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StudyDataTypes, StudyStatus } from '@prisma/client'
import multer from 'multer'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { StudyInput } from 'types/Study'
import { Study, selectOptionsType } from 'types/index'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleFileCreate } from 'utils/api/handleFileCreate'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

/**
 * Api setup for uploading documents
 *
 * Reference tutorial: https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
 * Multer reference: https://github.com/expressjs/multer#readme
 */
const apiRoute = connect()

// Config multer to process files in memory
const uploadMiddleware = multer({
	storage: multer.memoryStorage()
})

// Middleware processing FormData to file
apiRoute.use(uploadMiddleware.single('file'))

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
apiRoute.post(async (req: ApiRequestWithFile, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)

	const studyQuery = async () => {
		const {
			title,
			coordinator,
			endDate,
			description,
			dataTypes: dt
		} = req.body as Omit<StudyInput, 'dataTypes'> & { dataTypes: string }
		console.log('req.body: ', req.body as StudyInput)

		const dataTypes: StudyDataTypes[] = JSON.parse(dt).map(
			(dataType: selectOptionsType) => dataType.value as StudyDataTypes
		)

		// Upload (to cloudinary)
		const createImage = await handleFileCreate(req.file, session.userId)

		return await prisma.study.create({
			data: {
				title,
				endDate: new Date(endDate),
				description,
				status: StudyStatus.new,
				submissionDate: new Date(),
				dataTypes,
				users: {
					create: {
						user: {
							connect: {
								email: coordinator
							}
						}
					}
				},
				image: createImage
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

// Disallow body parsing, consume as stream, for file upload
export const config = {
	api: {
		bodyParser: false
	}
}
