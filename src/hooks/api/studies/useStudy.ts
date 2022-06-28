import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query'
import { Study } from 'types/Study'
import { getStudy, updateStudy } from 'utils/api/studies'
import { reactQueryClient } from 'utils/react-query'

export const useStudy = (
	studyId: string
): UseQueryResult<Study> & {
	update: UseMutationResult<Study, unknown, Partial<Study>>
} => {
	const query = useQuery(['studies', studyId], () => getStudy(studyId))

	const updateMutation = useMutation(
		`study-${studyId}`,
		(updatedStudy: Partial<Study>) => updateStudy(studyId, updatedStudy),
		{
			onMutate: async (updatedStudy) => {
				await reactQueryClient.cancelQueries(['studies', studyId])
				const previousStudy = reactQueryClient.getQueryData<Study>(['studies', studyId])

				// Optimistically update to the new value
				reactQueryClient.setQueryData(['studies', studyId], { ...previousStudy, ...updatedStudy })

				// Return a context with the previous and new todo
				return { previousStudy, updatedStudy }
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
function createOptimisticStudyFromFormData(newStudy: any, session: any): Study {
	throw new Error('Function not implemented.')
}
