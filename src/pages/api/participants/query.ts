import type { NextApiRequest, NextApiResponse } from 'next'
import { Filter, QueryBuilderModel } from 'types/QueryBuilder'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { parseParamArray } from 'utils/api/parseParamArray'
import { getParticipants } from 'utils/api/queryBuilder/getParticipants'
import { getParticipantsViaTodo } from 'utils/api/queryBuilder/getParticipantsViaTodo'
import { getWhereFromFilters } from 'utils/api/queryBuilder/getWhereFromFilters'

const apiRoute = connect()
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { model } = req.query as {
		model: QueryBuilderModel
	}

	const filters = parseParamArray<Filter>(req.query['filters[]'])

	// Todo
	const query = async () => {
		// General query
		if (!filters?.length) return await getParticipants()

		const todoWhere = getWhereFromFilters(filters, QueryBuilderModel.todo)
		const participantWhere = getWhereFromFilters(filters, QueryBuilderModel.participant)

		if (todoWhere.where && Object.keys(todoWhere.where).length > 0) {
			// Do complicated todo query
			return await getParticipantsViaTodo(todoWhere, participantWhere)
		} else {
			// Do less complicated single layer participant todo
			return await getParticipants(participantWhere)
		}
	}

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
