import type { NextApiRequest, NextApiResponse } from 'next'
import { QueryBuilderModels } from 'types/QueryBuilder'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

// Get a aggregated study data
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { model } = req.query

	const where = {
		where: {
			userName: 'test'
		}
	}

	const query = async () =>
		prisma.$transaction(() => prisma[model as QueryBuilderModels].findMany({}))

	handleQuery({
		req,
		res,
		model: model as QueryBuilderModels,
		query,
		role: 'admin'
	})
})

export default apiRoute
