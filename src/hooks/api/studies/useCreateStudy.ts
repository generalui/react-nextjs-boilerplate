import { Document } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { UseMutateFunction, useMutation } from 'react-query'
import { StudyInput } from 'types/index'
import { Study } from 'types/index'
import { axios } from 'utils/axios'
import { reactQueryClient } from 'utils/react-query'

// TODO: retype in types/Study
function createStudy(newStudy: StudyInput) {
	return axios.post('/studies', newStudy)
}

export function useCreateStudy() {
	const { data: session } = useSession()

	const { mutate, ...mutation } = useMutation(createStudy, {
		onMutate: async (newStudy) => {
			// TODO: coordinator should be an object from a react select component
			const { title, endDate, description, image, coordinator } = newStudy
			// Cancel current queries for the studies list
			await reactQueryClient.cancelQueries('studies')

			// Create optimistic study
			const optimisticStudy: Study = {
				id: new Date().toISOString(),
				users: [
					{
						user: {
							id: new Date().toISOString(),
							email: session?.user?.email || '',
							name: session?.user?.name || '',
							emailVerified: null,
							password: null,
							image: null
						}
					}
				],
				imageId: new Date().toISOString(),
				image: image
					? ({
							id: new Date().toISOString(),
							name: '',
							url: image,
							fileType: 'image',
							uploadedById: null,
							studyId: null,
							study: null
					  } as Document)
					: undefined,
				status: 'new',
				submissionDate: new Date(),
				description,
				endDate: new Date(endDate),
				title
			}

			// Add optimistic study to studies list
			reactQueryClient.setQueryData('studies', (old: Study[] | undefined) => {
				const nextCache = [...(old || []), optimisticStudy]

				return nextCache
			})

			// Return context with the optimistic study
			return { optimisticStudy }
		},
		onSuccess: ({ data }, variables, context) => {
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
