import { ApiQueryResults, QueryBuilderParams } from 'types/QueryBuilder'
import { axios } from 'utils/client/axios'

export const getQueryBuilderResults = async (
	queryParams?: QueryBuilderParams
): Promise<ApiQueryResults> => {
	let filters
	if (queryParams?.filters) {
		filters = queryParams?.filters.value ? queryParams?.filters : undefined
	}
	const response = await axios.get<ApiQueryResults>(`/query-builder`, {
		params: {
			model: queryParams?.model,
			summaryModel: queryParams?.summaryModel,
			filters
		}
	})

	return response.data
}
