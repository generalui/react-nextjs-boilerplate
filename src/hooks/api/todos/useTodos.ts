import { UseQueryResult, useQuery } from 'react-query'
import { QueryOptions, Todo } from 'types/index'
import { getTodos } from 'utils/requests/todos'

export type UseTodos = (queryOptions?: QueryOptions) => Omit<
	UseQueryResult<Awaited<ReturnType<typeof getTodos>>, unknown>,
	'data'
> & {
	todos?: Todo[]
	count?: number
	hasMore?: boolean
}

export const useTodos: UseTodos = (queryOptions) => {
	const { data, ...query } = useQuery(
		['todos', queryOptions?.page, queryOptions?.pageSize],
		() => getTodos(queryOptions),
		{
			keepPreviousData: true
		}
	)

	return { ...data, ...query }
}
