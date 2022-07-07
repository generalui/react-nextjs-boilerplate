import { User } from '@prisma/client'
import { axios } from 'utils/client/axios'

export const getCurrentUser = async (): Promise<User> => {
	const response = await axios.get('/current-user')
	return response.data
}
