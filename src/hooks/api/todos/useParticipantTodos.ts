import { UseQueryResult, useQuery } from 'react-query'
import { QueryOptions, Todo } from 'types/index'
import { getParticipantTodos } from 'utils/requests/todos'

export type UseParticipantTodos = (
	participantId?: string,
	queryOptions?: QueryOptions
) => Omit<UseQueryResult<Awaited<ReturnType<typeof getParticipantTodos>>, unknown>, 'data'> & {
	todos?: Todo[]
	count?: number
	hasMore?: boolean
}

export const useParticipantTodos: UseParticipantTodos = (participantId, queryOptions) => {
	const { data, ...query } = useQuery(
		['todos', queryOptions?.page, queryOptions?.pageSize],
		() => getParticipantTodos(participantId || '', queryOptions),
		{
			enabled: !!participantId,
			keepPreviousData: true
		}
	)

	return { ...data, ...query }
}
