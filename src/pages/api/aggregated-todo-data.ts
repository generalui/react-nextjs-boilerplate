import { getAggregatedTodoData } from 'models/Todos/query/getAggregatedTodoData'
import type { NextApiRequest, NextApiResponse } from 'next'
import { AggregatedTodoData } from 'types/AggregatedTodoData'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'

const apiRoute = connect()

// Get a aggregated todo data
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	handleQuery<AggregatedTodoData>({
		req,
		res,
		model: 'todo',
		query: getAggregatedTodoData,
		role: 'admin',
		disableLog: true
	})
})

export default apiRoute
