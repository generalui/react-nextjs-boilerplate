import { User } from '@prisma/client'
import { axios } from 'utils/client/axios'

export const getUsers = async (): Promise<User[]> => {
	const response = await axios.get('/users')
	return response.data
}
