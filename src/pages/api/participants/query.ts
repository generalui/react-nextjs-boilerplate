import type { NextApiRequest, NextApiResponse } from 'next'
import { QueryBuilderModels } from 'types/QueryBuilder'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { getQuery } from 'utils/api/queryBuilder'
import { getJSON } from 'utils/getJSON'

const apiRoute = connect()
const transformParticipantFilters = (filtersJSON?: string) => {
	const filters = getJSON(filtersJSON)
}

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { model, filters } = req.query as {
		model: QueryBuilderModels
		filters?: string
	}

	// Transform filters
	const transformQueryFilters = transformParticipantFilters(filters)

	// Filter participants on studies
	const query = getQuery(model, filters)

	// Get count of studies
	// const studyCount = getCount('study', studyFilter)

	// Get count of records
	// const recordsCount = getCount('documents', documentsFilter)

	handleQuery({
		req,
		res,
		model: model as QueryBuilderModels,
		query,
		role: 'admin',
		disableLog: true
	})
})

export default apiRoute
