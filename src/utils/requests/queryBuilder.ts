import { ApiQueryResults, QueryBuilderParams } from 'types/QueryBuilder'
import { axios } from 'utils/client/axios'

export const getQueryBuilderResults = async (
	queryParams?: QueryBuilderParams
): Promise<ApiQueryResults> => {
	const response = await axios.get<ApiQueryResults>(`/query-builder`, {
		params: {
			model: queryParams?.model,
			summaryModel: queryParams?.summaryModel,
			filters: queryParams?.filters
		}
	})

	return response.data
}
