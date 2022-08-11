import { UseQueryResult, useQuery } from 'react-query'
import { QueryOptions, Study } from 'types/index'
import { getUserStudies } from 'utils/requests/studies'

export type UseUserStudies = (
	userId?: string,
	queryOptions?: QueryOptions
) => Omit<UseQueryResult<Awaited<ReturnType<typeof getUserStudies>>, unknown>, 'data'> & {
	studies?: Study[]
	count?: number
	hasMore?: boolean
}

export const useUserStudies: UseUserStudies = (userId, queryOptions) => {
	const { data, ...query } = useQuery(
		['studies', queryOptions?.page, queryOptions?.pageSize],
		() => getUserStudies(userId, queryOptions),
		{
			enabled: !!userId,
			keepPreviousData: true
		}
	)

	return { ...data, ...query }
}
