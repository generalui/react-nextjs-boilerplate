import { UseQueryResult, useQuery } from 'react-query'
import { getAggregatedTodoData } from 'utils/requests/todos'

export const useAggregatedTodoData = (): UseQueryResult<
	Awaited<ReturnType<typeof getAggregatedTodoData>>,
	unknown
> => {
	const query = useQuery('aggregated-todo-data', getAggregatedTodoData)
	return query
}
