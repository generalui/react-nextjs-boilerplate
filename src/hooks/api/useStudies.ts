import { UseQueryResult, useQuery } from 'react-query'
import { QueryOptions, Study } from 'types/index'
import { getStudies } from 'utils/requests/studies'

export type UseStudies = (queryOptions?: QueryOptions) => Omit<
	UseQueryResult<Awaited<ReturnType<typeof getStudies>>, unknown>,
	'data'
> & {
	studies?: Study[]
	count?: number
	hasMore?: boolean
}

export const useStudies: UseStudies = (queryOptions) => {
	const { data, ...query } = useQuery(
		['studies', queryOptions?.page, queryOptions?.pageSize],
		() => getStudies(queryOptions),
		{
			keepPreviousData: true
		}
	)

	return { ...data, ...query }
}
