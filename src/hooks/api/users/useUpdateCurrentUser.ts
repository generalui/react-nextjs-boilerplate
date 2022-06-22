import { useMutation } from 'react-query'
import { UserInput } from 'types/index'
import { axios } from 'utils/axios'

function updateCurrentUser(currentUserUpdate: UserInput) {
	return axios.patch('/current-user', currentUserUpdate)
}

export function useUpdateCurrentUser() {
	const { mutate, ...mutation } = useMutation(updateCurrentUser)

	return { updateCurrentUser: mutate, ...mutation }
}
