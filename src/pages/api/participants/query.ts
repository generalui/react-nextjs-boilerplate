import { getParticipants } from 'models/Participants/query/getParticipants'
import type { NextApiRequest, NextApiResponse } from 'next'
import { QueryBuilderModel } from 'types/QueryBuilder'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'

const apiRoute = connect()
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { model } = req.query as { model: QueryBuilderModel }

	handleQuery({
		req,
		res,
		model: model as QueryBuilderModel,
		query: getParticipants(req),
		role: 'admin',
		disableLog: true
	})
})

export default apiRoute
