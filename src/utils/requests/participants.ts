import qs from 'query-string'
import { ParticipantQueryResults } from 'types/Participants'
import { Filter, FilterInput, QueryBuilderParams } from 'types/QueryBuilder'
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
