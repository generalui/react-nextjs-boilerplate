import { useQuery } from 'react-query'
import { ApiParticipantQueryResults } from 'types/Participants'
import { Filter } from 'types/QueryBuilder'
import { getParticipantsQuery } from 'utils/requests/participants'

// const [queryBuilderFilters, { inc, add, reset }] = createReduxModule('count', 0, {
// 	inc: (state) => state + 1,
// 	add: (state, amount) => state + amount,
// 	reset: () => 0
// })

// export const useParticipantQueryFilters = queryBuilderFilters

export const useParticipantQuery = (filters?: Filter[]) => {
	const { data, ...query } = useQuery<ApiParticipantQueryResults | undefined>(
		['participants-query', filters],
		() => getParticipantsQuery(filters),

		{
			keepPreviousData: true
		}
	)

	return { participants: data, ...query }
}
