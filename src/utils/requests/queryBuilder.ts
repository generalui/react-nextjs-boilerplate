import { ApiQueryResults, QueryBuilderParams } from 'types/QueryBuilder'
import { axios } from 'utils/client/axios'

export const getQueryBuilderResults = async (
	queryParams: QueryBuilderParams
): Promise<ApiQueryResults> => {
	const { model, summaryModel, filters } = queryParams
	const response = await axios.get<ApiQueryResults>(`/query-builder`, {
		params: { model, summaryModel, filters }
	})

	if (!response.data) {
		throw new Error('Study not found')
	}

	return response.data
}
