import { User } from '@prisma/client'
import { axios } from 'utils/client/axios'

export const getUsers = async (): Promise<User[]> => {
	const response = await axios.get('/users')
	return response.data
}

export const updateUser = async (user: User, password: string): Promise<User> => {
	const response = await axios.patch('/users', { user, password })
	return response.data
}
