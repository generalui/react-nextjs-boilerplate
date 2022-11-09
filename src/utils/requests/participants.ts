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
	studyId: string
): Promise<Consent> => {
	const response = await axios.get<Consent>(`/studies/${studyId}/${participantId}/consent`)

	if (!response.data) {
		throw new Error('Study not found')
	}

	return response.data
}

export const updateParticipantConsent = async (
	participantId: string,
	studyId: string,
	consent: ConsentInput
): Promise<Consent> => {
	const response = await axios.put<Consent>(`/studies/${studyId}/${participantId}/consent`, {
		consent
	})

	if (!response.data) {
		throw new Error('Study not found')
	}

	return response.data
}
