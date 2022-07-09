import { User } from '@prisma/client'
import { useMutation } from 'react-query'
import { UserInput } from 'types/index'
import { withFile } from 'utils/client/axios'
import { reactQueryClient } from 'utils/client/react-query'
import { useCurrentUser } from './useCurrentUser'

function updateCurrentUser({ image, ...currentUserUpdate }: UserInput) {
	return withFile<User>('/current-user', currentUserUpdate, image, 'patch')
}

export function useUpdateCurrentUser() {
	const { currentUser } = useCurrentUser()
	const { mutate, ...mutation } = useMutation('current-user', updateCurrentUser, {
		onMutate: async (currentUserUpdate) => {
			if (!currentUser) return undefined

			const { name } = currentUserUpdate

			await reactQueryClient.cancelQueries('current-user')

			const optimisticCurrentUser: User = {
				...currentUser,
				name
			}

			reactQueryClient.setQueryData('current-user', () => optimisticCurrentUser)

			return { optimisticCurrentUser }
		},
		onSuccess: (_data, _variables, context) => {
			reactQueryClient.setQueryData('current-user', () => {
				return (context as { optimisticCurrentUser: User })?.optimisticCurrentUser
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
