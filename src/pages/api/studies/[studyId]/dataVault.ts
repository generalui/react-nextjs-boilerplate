import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('here')
	const { studyId } = req.query

	const studyQuery = async () =>
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
		query: studyQuery
	})
})

export default apiRoute
