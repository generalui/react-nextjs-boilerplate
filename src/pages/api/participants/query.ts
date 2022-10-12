import type { NextApiRequest, NextApiResponse } from 'next'
import { Filter, QueryBuilderModel } from 'types/QueryBuilder'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { parseParamArray } from 'utils/api/parseParamArray'
import { getQuery } from 'utils/api/queryBuilder'

const apiRoute = connect()
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { model } = req.query as {
		model: QueryBuilderModel
	}

	const filters = parseParamArray<Filter>(req.query['filters[]'])

	// Filter participants on studies
	const query = getQuery('participant', filters)

	// Get count of studies
	// const studyCount = getCount('study', studyFilter)

	// Get count of records
	// const recordsCount = getCount('documents', documentsFilter)

	handleQuery({
		req,
		res,
		model: model as QueryBuilderModel,
		query,
		role: 'admin',
		disableLog: true
	})
})

export default apiRoute
