import { User } from '@prisma/client'
import { useMutation } from 'react-query'
import { UserInput } from 'types/index'
import { axiosWithFile } from 'utils/client/axiosWithFile'
import { reactQueryClient } from 'utils/client/react-query'
import { toast } from 'utils/client/toast'
import { useText } from 'hooks/useText'
import { useCurrentUser } from './useCurrentUser'

function updateCurrentUser({ image, ...currentUserUpdate }: UserInput) {
	return axiosWithFile<User>('/current-user', currentUserUpdate, { image }, 'patch')
}

export function useUpdateCurrentUser() {
	const { currentUser } = useCurrentUser()
	const { t } = useText('profile.updateUserForm')

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
			toast(t('success'))
		},
		onError: () => {
			// Remove optimistic user and return previous user data
			reactQueryClient.setQueryData('current-user', () => currentUser)
			toast(t('error'), 'error')
		},
		retry: 3
	})

	return { updateCurrentUser: mutate, ...mutation }
}
