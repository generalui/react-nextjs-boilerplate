import { useSession } from 'next-auth/react'
import { useMutation } from 'react-query'
import { Study } from 'types/index'
import { createStudy } from 'utils/api/studies'
import { reactQueryClient } from 'utils/react-query'
import { createOptimisticStudyFromFormData } from 'utils/studies'

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
		onSuccess: (data, variables, context: { optimisticStudy: Study } | undefined) => {
			// Replace optimistic study in the studies list with the result
			reactQueryClient.setQueryData('studies', (old: Study[] | undefined) => {
				const nextCache = (old || []).map((study: any) =>
					study.id === context?.optimisticStudy?.id ? data : study
				)
				return nextCache
			})
		},
		onError: (error, variables, context) => {
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
