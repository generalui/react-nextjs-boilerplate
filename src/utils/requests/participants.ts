import { Consent } from '@prisma/client'
import { ConsentInput } from 'types/Consent'
import { axios } from 'utils/client/axios'

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
