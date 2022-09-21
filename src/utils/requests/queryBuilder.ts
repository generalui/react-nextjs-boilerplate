import { ApiQueryResults, ConditionInput, QueryBuilderModels } from 'types/QueryBuilder'
import { axios } from 'utils/client/axios'

export const getQueryBuilderResults = async (
	model: QueryBuilderModels,
	summaryModel: QueryBuilderModels,
	filters: ConditionInput | undefined
): Promise<ApiQueryResults> => {
	const response = await axios.get<ApiQueryResults>(`/query-builder`, {
		params: { model, summaryModel, filters }
	})

	if (!response.data) {
		throw new Error('Study not found')
	}

	return response.data
}
