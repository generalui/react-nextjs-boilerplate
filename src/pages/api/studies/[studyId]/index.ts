import type { NextApiRequest, NextApiResponse } from 'next'
import { studyIncludes } from 'src/pages/api/studies/utils'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { StudyInput } from 'types/index'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleAvatarJoin } from 'utils/api/handleAvatarJoin'
import { handleDocumentationJoin } from 'utils/api/handleDocumentationJoin'
import { handleQuery } from 'utils/api/handleQuery'
import { multer } from 'utils/api/multer'
import { prisma } from 'utils/api/prisma'
import { getCombinedString } from 'utils/client/text'

export { config } from 'utils/api/multer'

const apiRoute = connect()

// Middleware processing FormData to file
apiRoute.use(
	multer.fields([
		{ name: 'image', maxCount: 1 },
		{ name: 'documentation', maxCount: 20 },
		{ name: 'dataVault', maxCount: 20 }
	])
)

// Get a study by ID
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	// TODO: validate that the user is authorized to view this study
	const { studyId } = req.query

	const studyQuery = async () =>
		await prisma.study.findUnique({
			where: {
				id: studyId as string
			},
			...studyIncludes
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
	// TODO: validate that the user is authorized to update this study
	const studyId = getCombinedString(req.query.studyId)
	const session = await getSessionFromReq(req)
	const { userId } = session

	// Extract body values that need transformation
	const { endDate, coordinator, dataTypes, ...simpleBody } = req.body as Omit<
		StudyInput,
		'coordinator' | 'dataTypes'
	> & {
		coordinator?: string
		dataTypes: string
	}

	// TODO: this needs include an update to the study users, it should be possible to update the coordinators on a study
	// Remove values that don't belong in the database
	const coordinatorJoin = coordinator
		? { users: { create: { user: { connect: { id: coordinator } } } } }
		: undefined

	const upsertImage = await handleAvatarJoin(req.files?.image?.[0], userId)
	const upsertDocumentation = await handleDocumentationJoin(req.files?.documentation, userId)

	// TODO: there should be a better way to manage arrays of strings coming from the client
	const insertDataTypes = dataTypes ? { dataTypes: JSON.parse(dataTypes) } : undefined

	const data = {
		...simpleBody,
		endDate: endDate ? new Date(endDate) : undefined,
		...insertDataTypes,
		...upsertImage,
		...upsertDocumentation,
		...coordinatorJoin
	}

	const studyQuery = async () => {
		if (coordinatorJoin) {
			// The current functionality of the app is that there is only one coordinator per study.
			// So we must remove the others before updating the study.
			await prisma.coordinatorsOnStudies.deleteMany({
				where: {
					studyId: studyId
				}
			})
		}

		return await prisma.study.update({
			where: {
				id: studyId
			},
			data,
			...studyIncludes
		})
	}

	handleQuery({
		req,
		res,
		model: 'study',
		query: studyQuery
	})
})

export default apiRoute
