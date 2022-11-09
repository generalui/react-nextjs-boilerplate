import type { NextApiRequest, NextApiResponse } from 'next'
import { Filter, QueryBuilderModel } from 'types/QueryBuilder'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { parseParamArray } from 'utils/api/parseParamArray'
import { getParticipants } from 'utils/api/queryBuilder/getParticipants'
import { getParticipantsViaStudy } from 'utils/api/queryBuilder/getParticipantsViaStudy'
import { getWhereFromFilters } from 'utils/api/queryBuilder/getWhereFromFilters'

const apiRoute = connect()
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { model } = req.query as {
		model: QueryBuilderModel
	}

	const filters = parseParamArray<Filter>(req.query['filters[]'])

	// Study
	const query = async () => {
		// General query
		if (!filters?.length) return await getParticipants()

		const studyWhere = getWhereFromFilters(filters, QueryBuilderModel.study)
		const participantWhere = getWhereFromFilters(filters, QueryBuilderModel.participant)

		if (studyWhere.where && Object.keys(studyWhere.where).length > 0) {
			// Do complicated study query
			return await getParticipantsViaStudy(studyWhere, participantWhere)
		} else {
			// Do less complicated single layer participant study
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
