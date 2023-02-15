import { ParticipantQueryResults } from 'types/Participants'
import { Filter } from 'types/QueryBuilder'
import { axios } from 'utils/client/axios'

// Cohort builder query
export const getParticipantsQuery = async (
	filters?: Filter[]
): Promise<ParticipantQueryResults | undefined> => {
	const response = await axios.get<ParticipantQueryResults>(`participants/query`, {
		params: {
			filters
		}
	})

	return response.data
}
