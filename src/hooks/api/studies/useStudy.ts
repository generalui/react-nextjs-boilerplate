import { useSession } from 'next-auth/react'
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query'
import { Study, StudyInput } from 'types/Study'
import { reactQueryClient } from 'utils/client/react-query'
import { toast } from 'utils/client/toast'
import { createPartialStudyFromFormData } from 'utils/models/studies'
import { getStudy, updateStudy } from 'utils/requests/studies'
import { useText } from 'hooks/useText'

export const useStudy = (
	studyId: string
): UseQueryResult<Study> & {
	update: UseMutationResult<Study, unknown, Partial<StudyInput>>
} => {
	const { data: session } = useSession()
	const { t: error } = useText('studies.error')
	const { t: success } = useText('studies.success')

	const query = useQuery(['studies', studyId], () => getStudy(studyId), {
		enabled: !!studyId,
		retry: false
	})

	const updateMutation = useMutation(
		`study-${studyId}`,
		(studyUpdate: Partial<StudyInput>) => updateStudy(studyId, studyUpdate),
		{
			onMutate: async (studyUpdate) => {
				await reactQueryClient.cancelQueries(['studies', studyId])
				const previousStudy = reactQueryClient.getQueryData<Study>(['studies', studyId])

				if (!previousStudy) {
					toast(error('doesNotExist'), 'error')
					return
				}

				const optimisticStudy: Study = {
					...previousStudy,
					...createPartialStudyFromFormData(studyUpdate, session)
				}

				// Optimistically update to the new value
				reactQueryClient.setQueryData(['studies', studyId], {
					...previousStudy,
					...optimisticStudy
				})

				return { previousStudy }
			},
			onSuccess: () => {
				toast(success('updated'))
			},
			onError: (_err, _newStudy, context?: { previousStudy: Study }) => {
				reactQueryClient.setQueryData(['studies', studyId], context?.previousStudy)
			},
			onSettled: () => {
				reactQueryClient.invalidateQueries(['studies', studyId])
			}
		}
	)

	return { ...query, update: updateMutation }
}
