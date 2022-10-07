import { Consent } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query'
import { ConsentPickDataTypes } from 'types/Consent'
import { DataVault, DataVaultInput, Study, StudyInput } from 'types/Study'
import { reactQueryClient } from 'utils/client/react-query'
import { toast } from 'utils/client/toast'
import { createPartialStudyFromFormData } from 'utils/models/studies'
import { getParticipantConsent } from 'utils/requests/participants'
import {
	getStudy,
	getStudyDataVault,
	postStudyDataVault,
	updateStudy
} from 'utils/requests/studies'
import { useText } from 'hooks/useText'

export const useParticipantStudyConsent = (
	participantId?: string,
	studyId?: string
): Omit<UseQueryResult<Consent>, 'data'> & {
	consent?: ConsentPickDataTypes
} => {
	const { t: error } = useText('studies.error')
	const { t: success } = useText('studies.success')
	const [consent, setConsent] = useState({})

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
			const { analysis, geneticData, healthRecords, specimens } = consentQuery.data
			setConsent({ analysis, geneticData, healthRecords, specimens })
		}
	}, [consentQuery?.data])

	const updateConsent = useMutation(
		`study-${studyId}-update-consent`,
		(dataVaultValues: DataVaultInput) => postStudyDataVault(studyId || '', dataVaultValues),
		{
			onSuccess: () => {
				toast(success('consentUpdated'))
			},
			onError: (_err, _newStudy, context?: { previousStudy: Study }) => {
				reactQueryClient.setQueryData(['studies', studyId], context?.previousStudy)
				toast(error('failedToUpdateConsent'), 'error')
			},
			onSettled: () => {
				reactQueryClient.invalidateQueries(['studies', studyId])
			}
		}
	)

	return {
		consent,
		...consentQuery
	}
}
