import { User } from '@prisma/client'
import { useMutation } from 'react-query'
import { toast } from 'utils/client/toast'
import { updateUser } from 'utils/requests/users'
import { useText } from 'hooks/useText'

export function useUpdateUser(onSuccess?: () => void, onError?: () => void) {
	const { t: error } = useText('common.error')

	const { mutate } = useMutation(
		'current-user',
		({ user, password }: { user: User; password: string }) => updateUser(user, password),
		{
			onSuccess: () => {
				onSuccess?.()
			},
			onError: () => {
				toast(error('generalError'), 'error')

				onError?.()
			},
			retry: 3
		}
	)

	return { mutate }
}
