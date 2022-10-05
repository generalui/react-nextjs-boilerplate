import { Consent } from '@prisma/client'
import { axios } from 'utils/client/axios'

export const getParticipantConsent = async (
	participantId: string,
	studyId: string
): Promise<Consent> => {
	const response = await axios.get<Consent>(`/studies/${studyId}/${participantId}/consent`)
	console.log('Consent response', response)

	if (!response.data) {
		throw new Error('Study not found')
	}

	return response.data
}
