import { useQuery } from 'react-query'
import { ApiQueryResults, QueryBuilderParams } from 'types/QueryBuilder'
import { getQueryBuilderResults } from 'utils/requests/queryBuilder'

export const useQueryBuilder = (params: QueryBuilderParams) => {
	const query = useQuery<ApiQueryResults>(['participants/query', params.filters], () =>
		getQueryBuilderResults(params)
	)

	return query
}
