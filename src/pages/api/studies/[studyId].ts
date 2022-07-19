// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StudyDataTypes } from '@prisma/client'
import multer from 'multer'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { StudyInput, selectOptionsType } from 'types/index'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleAvatarJoin } from 'utils/api/handleAvatarJoin'
import { handleDocumentationJoin } from 'utils/api/handleDocumentationJoin'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'
import { getCombinedString } from 'utils/client/text'

const apiRoute = connect()

// Config multer to process files in memory
const uploadMiddleware = multer({
	storage: multer.memoryStorage()
})

// Middleware processing FormData to file
apiRoute.use(
	uploadMiddleware.fields([
		{ name: 'file', maxCount: 1 },
		{ name: 'documentation', maxCount: 20 }
	])
)

// Included on all studies
const includes = {
	include: {
		users: {
			include: {
				user: true
			}
		},
		image: {
			include: {
				image: true
			}
		},
		documentation: true
	}
}

// Get a study by ID
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { studyId } = req.query

	const studyQuery = async () =>
		await prisma.study.findUnique({
			where: {
				id: studyId as string
			},
			...includes
		})

	handleQuery({
		req,
		res,
		model: 'study',
		query: studyQuery
	})
})

// Update study by ID
apiRoute.patch(async (req: ApiRequestWithFile, res: NextApiResponse) => {
	const studyId = getCombinedString(req.query.studyId)
	const session = await getSessionFromReq(req)
	const { userId } = session

	// Extract body values that need transformation
	const {
		endDate,
		dataTypes: dt,
		...simpleBody
	} = req.body as Omit<StudyInput, 'coordinator' | 'dataTypes'> & {
		coordinator?: string
		dataTypes: string
	}

	// TODO: this should be handled on the front end before the request is made.
	const dataTypes: StudyDataTypes[] = dt
		? JSON.parse(dt).map((dataType: selectOptionsType) => dataType.value as StudyDataTypes)
		: undefined

	// TODO: this needs include an update to the study users, it should be possible to update the coordinators on a study
	// Remove values that don't belong in the database
	delete simpleBody.coordinator

	const upsertImage = await handleAvatarJoin(req.file, userId)
	const upsertDocumentation = await handleDocumentationJoin(req.files?.documentation, userId)

	const data = {
		...simpleBody,
		endDate: endDate ? new Date(endDate) : undefined,
		dataTypes,
		...upsertImage,
		...upsertDocumentation
	}

	const studyQuery = async () =>
		prisma.study.update({
			where: {
				id: studyId
			},
			data,
			...includes
		})

	handleQuery({
		req,
		res,
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
