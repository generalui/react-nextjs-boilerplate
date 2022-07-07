import { useSession } from 'next-auth/react'
import { useMutation } from 'react-query'
import { Study } from 'types/index'
import { reactQueryClient } from 'utils/client/react-query'
import { createOptimisticStudyFromFormData } from 'utils/models/studies'
import { createStudy } from 'utils/requests/studies'

export function useCreateStudy() {
	const { data: session } = useSession()

	const { mutate, ...mutation } = useMutation('create-study', createStudy, {
		onMutate: async (newStudy) => {
			// Cancel current queries for the studies list
			await reactQueryClient.cancelQueries('studies')

			// Create optimistic study
			const optimisticStudy: Study = createOptimisticStudyFromFormData(newStudy, session)

			// Add optimistic study to studies list
			reactQueryClient.setQueryData('studies', (old: Study[] | undefined) => [
				optimisticStudy,
				...(old || [])
			])

			// Return context with the optimistic study
			return { optimisticStudy }
		},
		onSuccess: (data, _variables, context?: { optimisticStudy: Study }) => {
			// Replace optimistic study in the studies list with the result
			reactQueryClient.setQueryData('studies', (old: Study[] | undefined) => {
				const nextCache = (old || []).map((study: any) =>
					study.id === context?.optimisticStudy?.id ? data : study
				)
				return nextCache
			})
		},
		onError: (_error, _variables, context?: { optimisticStudy: Study }) => {
			// Remove optimistic study from the studies list
			reactQueryClient.setQueryData(
				'studies',
				(old: Study[] | undefined) =>
					(old || []).filter((study: Study) => study.id !== context?.optimisticStudy?.id) as Study[]
			)
		},
		retry: 3
	})

	return { createStudy: mutate, ...mutation }
}
