import { useSession } from 'next-auth/react'
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query'
import { DataVault, DataVaultInput, Study, StudyInput } from 'types/Study'
import { reactQueryClient } from 'utils/client/react-query'
import { toast } from 'utils/client/toast'
import { createPartialStudyFromFormData } from 'utils/models/studies'
import {
	getStudy,
	getStudyDataVault,
	postStudyDataVault,
	updateStudy
} from 'utils/requests/studies'
import { useText } from 'hooks/useText'

export const useStudy = (
	studyId: string
): UseQueryResult<Study> & {
	dataVault: UseQueryResult<DataVault[]>
	update: UseMutationResult<Study, unknown, Partial<StudyInput>>
	uploadToDataVault: UseMutationResult<Study, unknown, DataVaultInput>
} => {
	const { data: session } = useSession()
	const { t: error } = useText('studies.error')
	const { t: success } = useText('studies.success')

	const query = useQuery(['studies', studyId], () => getStudy(studyId), {
		enabled: !!studyId,
		retry: false
	})

	const dataVault = useQuery(['studies', studyId, 'data-vault'], () => getStudyDataVault(studyId), {
		enabled: !!studyId,
		retry: false
	})

	const updateMutation = useMutation(
		`study-${studyId}`,
		(studyUpdate: Partial<StudyInput>) => updateStudy(studyId, studyUpdate),
		{
			// TODO: re-implement optimistic loading
			// onMutate: async (studyUpdate) => {
			// 	await reactQueryClient.cancelQueries(['studies', studyId])
			// 	const previousStudy = reactQueryClient.getQueryData<Study>(['studies', studyId])

			// 	if (!previousStudy) {
			// 		toast(error('doesNotExist'), 'error')
			// 		return
			// 	}

			// 	const partialStudy = createPartialStudyFromFormData(studyUpdate, session)

			// 	const optimisticStudy: Study = {
			// 		...previousStudy,
			// 		...partialStudy,
			// 		documentation: [...previousStudy.documentation, ...(partialStudy?.documentation || [])]
			// 	}
			// 	console.log('~ optimisticStudy', optimisticStudy)

			// 	// Optimistically update to the new value
			// 	reactQueryClient.setQueryData(['studies', studyId], {
			// 		...previousStudy,
			// 		...optimisticStudy
			// 	})

			// 	return { previousStudy }
			// },
			onSuccess: () => {
				toast(success('updated'))
			},
			onError: (_err, _newStudy, context?: { previousStudy: Study }) => {
				reactQueryClient.setQueryData(['studies', studyId], context?.previousStudy)
				toast(error('failedToUpdate'), 'error')
			},
			onSettled: () => {
				reactQueryClient.invalidateQueries(['studies', studyId])
			}
		}
	)

	const uploadToDataVault = useMutation(
		`study-${studyId}-upload-to-data-vault`,
		(dataVaultValues: DataVaultInput) => {
			return postStudyDataVault(studyId, dataVaultValues)
		},
		{
			onSuccess: () => {
				toast(success('updated'))
			},
			onError: (_err, _newStudy, context?: { previousStudy: Study }) => {
				reactQueryClient.setQueryData(['studies', studyId], context?.previousStudy)
				toast(error('failedToUpload'), 'error')
			},
			onSettled: () => {
				reactQueryClient.invalidateQueries(['studies', studyId])
			}
		}
	)

	return { ...query, update: updateMutation, dataVault, uploadToDataVault }
}
