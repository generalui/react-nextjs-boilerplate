import { Consent } from '@prisma/client'
import qs from 'query-string'
import { ConsentInput } from 'types/Consent'
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

export const getParticipantConsent = async (
	participantId: string,
	todoId: string
): Promise<Consent> => {
	const response = await axios.get<Consent>(`/todos/${todoId}/${participantId}/consent`)

	if (!response.data) {
		throw new Error('Todo not found')
	}

	return response.data
}

export const updateParticipantConsent = async (
	participantId: string,
	todoId: string,
	consent: ConsentInput
): Promise<Consent> => {
	const response = await axios.put<Consent>(`/todos/${todoId}/${participantId}/consent`, {
		consent
	})

	if (!response.data) {
		throw new Error('Todo not found')
	}

	return response.data
}
