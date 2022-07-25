import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { DataVaultInput } from 'types/Study'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleDataVaultJoin } from 'utils/api/handleDataVaultJoin'
import { handleQuery } from 'utils/api/handleQuery'
import { multer } from 'utils/api/multer'
import { prisma } from 'utils/api/prisma'
import { studyIncludes } from '../utils'

export { config } from 'utils/api/multer'

const apiRoute = connect()

// Middleware processing FormData to file
apiRoute.use(multer.fields([{ name: 'dataVault', maxCount: 20 }]))

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { studyId } = req.query

	const dataVaultQuery = async () =>
		await prisma.dataVault.groupBy({
			by: ['dataType'],
			where: {
				studyId: { equals: studyId as string }
			},
			_count: true,
			_max: { inserted_at: true }
		})

	handleQuery({
		req,
		res,
		model: 'dataVault',
		query: dataVaultQuery
	})
})

// Upload files to the study dataVault
apiRoute.post(async (req: ApiRequestWithFile, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)

	const studyQuery = async () => {
		const { studyId } = req.query
		const { dataType } = req.body as DataVaultInput

		const dataVaultJoin = await handleDataVaultJoin(req.files?.dataVault, dataType, session.userId)

		return await prisma.study.update({
			where: {
				id: studyId as string
			},
			data: {
				...dataVaultJoin
			},
			...studyIncludes
		})
	}

	handleQuery({
		req,
		res,
		session,
		model: 'study',
		query: studyQuery
	})
})

export default apiRoute
