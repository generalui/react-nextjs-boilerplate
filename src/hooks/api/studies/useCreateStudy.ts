import { useSession } from 'next-auth/react'
import { useMutation } from 'react-query'
import { Study } from 'types/index'
import { reactQueryClient } from 'utils/client/react-query'
import { toast } from 'utils/client/toast'
import { createOptimisticStudyFromFormData } from 'utils/models/studies'
import { createStudy } from 'utils/requests/studies'
import { useText } from 'hooks/useText'

export function useCreateStudy() {
	const { t } = useText('studies.create')

	// TODO: re-implement optimistic loading
	// const { data: session } = useSession()
	const { mutate, ...mutation } = useMutation('create-study', createStudy, {
		// onMutate: async (newStudy) => {
		// 	// Cancel current queries for the studies list
		// 	await reactQueryClient.cancelQueries('studies')

		// 	// Create optimistic study
		// 	const optimisticStudy: Study = createOptimisticStudyFromFormData(newStudy, session)

		// 	// Add optimistic study to studies list
		// 	reactQueryClient.setQueryData('studies', (old: Study[] | undefined) => [
		// 		optimisticStudy,
		// 		...(old || [])
		// 	])

		// 	// Return context with the optimistic study
		// 	return { optimisticStudy }
		// },
		onSuccess: (_data, _variables, _context?: { optimisticStudy: Study }) => {
			// Replace optimistic study in the studies list with the result
			// reactQueryClient.setQueryData('studies', (old: Study[] | undefined) => {
			// 	toast(t('created'))
			// 	const nextCache = (old || []).map((study: any) =>
			// 		study.id === context?.optimisticStudy?.id ? data : study
			// 	)
			// 	return nextCache
			// })
			reactQueryClient.invalidateQueries(['studies'])
			toast(t('success'))
		},
		onError: (_error, _variables, context?: { optimisticStudy: Study }) => {
			// Remove optimistic study from the studies list
			// reactQueryClient.setQueryData(
			// 	'studies',
			// 	(old: Study[] | undefined) =>
			// 		(old || []).filter((study: Study) => study.id !== context?.optimisticStudy?.id) as Study[]
			// )
			toast(t('error'), 'error')
		},
		retry: 3
	})

	return { createStudy: mutate, ...mutation }
}
