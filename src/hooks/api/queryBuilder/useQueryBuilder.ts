import { UseQueryResult, useQuery } from 'react-query'
import { ApiQueryResults, QueryBuilderParams } from 'types/QueryBuilder'
import { getQueryBuilderResults } from 'utils/requests/queryBuilder'

export type UseQueryBuilder = (params?: QueryBuilderParams) => any
// Omit<UseQueryResult<Awaited<ReturnType<typeof getQueryBuilderResults>>, unknown>, 'data'> &
// ApiQueryResults

export const useQueryBuilder: UseQueryBuilder = (params) => {
	const { data, ...query } = useQuery<ApiQueryResults>(
		['query-builder'],
		() => getQueryBuilderResults(params),
		{
			keepPreviousData: true
		}
	)

	return { ...data, ...query }
}
