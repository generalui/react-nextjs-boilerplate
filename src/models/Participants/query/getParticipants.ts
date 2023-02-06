import type { NextApiRequest } from 'next'
import { Filter, QueryBuilderModel } from 'types/QueryBuilder'
import { parseParamArray } from 'utils/api/parseParamArray'
import { getParticipants as getParticipantsQuery } from 'utils/api/queryBuilder/getParticipants'
import { getParticipantsViaTodo } from 'utils/api/queryBuilder/getParticipantsViaTodo'
import { getWhereFromFilters } from 'utils/api/queryBuilder/getWhereFromFilters'

export const getParticipants = (req: NextApiRequest) => {
	return async () => {
		const filters = parseParamArray<Filter>(req.query['filters[]'] || [])

		return async () => {
			// General query
			if (!filters?.length) return await getParticipantsQuery()

			const todoWhere = getWhereFromFilters(filters, QueryBuilderModel.todo)
			const participantWhere = getWhereFromFilters(filters, QueryBuilderModel.participant)

			if (todoWhere.where && Object.keys(todoWhere.where).length > 0) {
				// Do complicated todo query
				return await getParticipantsViaTodo(todoWhere, participantWhere)
			} else {
				// Do less complicated single layer participant todo
				return await getParticipantsQuery(participantWhere)
			}
		}
	}
}
