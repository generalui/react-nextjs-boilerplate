// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StudyStatus } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { ApiStudiesServerResponse, StudyInput } from 'types/Study'
import { Study } from 'types/index'
import { connect } from 'utils/api/connect'
import { getPaginationFromReq } from 'utils/api/getPaginationFromReq'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleAvatarJoin } from 'utils/api/handleAvatarJoin'
import { handleDocumentationJoin } from 'utils/api/handleDocumentationJoin'
import { handleQuery } from 'utils/api/handleQuery'
import { multer } from 'utils/api/multer'
import { prisma } from 'utils/api/prisma'
import { studyIncludes } from './utils'

export { config } from 'utils/api/multer'

/**
 * Api setup for uploading documents
 *
 * Reference tutorial: https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
 * Multer reference: https://github.com/expressjs/multer#readme
 */
const apiRoute = connect()

// Middleware processing FormData to file
apiRoute.use(
	multer.fields([
		{ name: 'image', maxCount: 1 },
		{ name: 'documentation', maxCount: 20 }
	])
)

// Get a list of studies
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const page = getPaginationFromReq(req)

	const studiesQuery = async () => {
		const [count, studies] = await prisma.$transaction([
			prisma.study.count({}),
			prisma.study.findMany({
				orderBy: [
					{
						submissionDate: 'desc'
					}
				],
				...studyIncludes,
				...page
			})
		])

		return { count, hasMore: page.skip + page.take < count, studies }
	}
	handleQuery<ApiStudiesServerResponse>({
		req,
		res,
		model: 'study',
		query: studiesQuery,
		disableLog: true
	})
})

// Create a new study
apiRoute.post(async (req: ApiRequestWithFile, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)

	const studyQuery = async () => {
		const { title, coordinator, endDate, description, dataTypes } = req.body as Omit<
			StudyInput,
			'dataTypes'
		> & { dataTypes: string }

		const insertDataTypes = dataTypes ? { dataTypes: JSON.parse(dataTypes) } : undefined

		const upsertImage = await handleAvatarJoin(req.files?.image?.[0], session.userId)
		const upsertDocumentation = await handleDocumentationJoin(
			req.files?.documentation,
			session.userId
		)

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
								id: coordinator
							}
						}
					}
				},
				...insertDataTypes,
				...upsertDocumentation,
				...upsertImage
			},
			...studyIncludes
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
