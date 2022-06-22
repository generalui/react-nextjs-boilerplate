import { User } from '@prisma/client'
import { useMutation } from 'react-query'
import { UserInput } from 'types/index'
import { axios } from 'utils/axios'
import { reactQueryClient } from 'utils/react-query'
import { useCurrentUser } from './useCurrentUser'

function updateCurrentUser(currentUserUpdate: UserInput) {
	return axios.patch('/current-user', currentUserUpdate)
}

export function useUpdateCurrentUser() {
	const { currentUser } = useCurrentUser()
	const { mutate, ...mutation } = useMutation(updateCurrentUser, {
		onMutate: async (currentUserUpdate) => {
			if (!currentUser) return reactQueryClient.cancelMutations()

			const { name, email } = currentUserUpdate

			await reactQueryClient.cancelQueries('current-user')

			const optimisticCurrentUser: User = {
				...currentUser,
				name,
				email
			}

			reactQueryClient.setQueryData('current-user', () => optimisticCurrentUser)

			return { optimisticCurrentUser }
		},
		onSuccess: ({ data }, variables, context) => {
			reactQueryClient.setQueryData('current-user', () => {
				return context?.optimisticCurrentUser
			})
		},
		onError: () => {
			// Remove optimistic user and return previous user data
			reactQueryClient.setQueryData('current-user', () => currentUser)
		},
		retry: 3
	})

	return { updateCurrentUser: mutate, ...mutation }
}
