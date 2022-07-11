import { User } from 'types/User'
import { axios } from 'utils/client/axios'

export const getCurrentUser = async (): Promise<User> => {
	const response = await axios.get('/current-user')
	return response.data
}
