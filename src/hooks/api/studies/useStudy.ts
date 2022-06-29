import { useSession } from 'next-auth/react'
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query'
import { Study, StudyInput } from 'types/Study'
import { getStudy, updateStudy } from 'utils/api/studies'
import { reactQueryClient } from 'utils/react-query'
import { createPartialStudyFromFormData } from 'utils/studies'

export const useStudy = (
	studyId: string
): UseQueryResult<Study> & {
	update: UseMutationResult<Study, unknown, Partial<StudyInput>>
} => {
	const { data: session } = useSession()
	const query = useQuery(['studies', studyId], () => getStudy(studyId))

	const updateMutation = useMutation(
		`study-${studyId}`,
		(studyUpdate: Partial<StudyInput>) => updateStudy(studyId, studyUpdate),
		{
			onMutate: async (studyUpdate) => {
				await reactQueryClient.cancelQueries(['studies', studyId])
				const previousStudy = reactQueryClient.getQueryData<Study>(['studies', studyId])

				if (!previousStudy) {
					// TODO: Handle trying to update a study that doesn't exist
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
			onError: (err, newStudy, context) => {
				reactQueryClient.setQueryData(['studies', studyId], context?.previousStudy)
			},
			onSettled: () => {
				reactQueryClient.invalidateQueries(['studies', studyId])
			}
		}
	)

	return { ...query, update: updateMutation }
}
