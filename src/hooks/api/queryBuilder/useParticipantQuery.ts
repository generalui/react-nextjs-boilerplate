import { useQuery } from 'react-query'
import { ParticipantQueryResults } from 'types/Participants'
import { Filter } from 'types/QueryBuilder'
import { getParticipantsQuery } from 'utils/requests/participants'

export const useParticipantQuery = (filters?: Filter[]) => {
	const { data, ...query } = useQuery<ParticipantQueryResults | undefined>(
		['participants-query', filters],
		() => getParticipantsQuery(filters),

		{
			keepPreviousData: true
		}
	)

	return { participants: data, ...query }
}
