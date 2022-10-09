import { Consent } from '@prisma/client'
import { useEffect, useState } from 'react'
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query'
import { ConsentInput, ConsentPickDataTypes } from 'types/Consent'
import { reactQueryClient } from 'utils/client/react-query'
import { toast } from 'utils/client/toast'
import { getParticipantConsent, updateParticipantConsent } from 'utils/requests/participants'
import { useModal } from 'hooks/useModal'
import { useText } from 'hooks/useText'

export const useParticipantStudyConsent = (
	participantId?: string,
	studyId?: string
): Omit<UseQueryResult<Consent>, 'data'> & {
	consent?: ConsentPickDataTypes
	updateConsent: UseMutationResult<ConsentPickDataTypes, unknown, ConsentInput>
} => {
	const { t } = useText('participant.study.consent.modal.form')
	const [consent, setConsent] = useState<ConsentPickDataTypes>()
	const { close } = useModal('edit-consent')

	const consentQuery = useQuery(
		['studies', studyId, 'consent'],
		() => getParticipantConsent(participantId || '', studyId || ''),
		{
			enabled: !!studyId && !!participantId,
			retry: false
		}
	)

	useEffect(() => {
		if (consentQuery?.data) {
			const { analyses, geneticData, healthRecords, specimens } = consentQuery.data
			setConsent({ analyses, geneticData, healthRecords, specimens })
		}
	}, [consentQuery?.data])

	const updateConsent = useMutation(
		`study-${studyId}-update-consent`,
		(consentValues: ConsentInput) =>
			updateParticipantConsent(participantId || '', studyId || '', consentValues),
		{
			onSuccess: () => {
				toast(t('success'))
				close()
			},
			onError: () => {
				toast(t('error'), 'error')
			},
			onSettled: () => {
				reactQueryClient.invalidateQueries(['studies', studyId])
			}
		}
	)

	return {
		consent,
		updateConsent,
		...consentQuery
	}
}
