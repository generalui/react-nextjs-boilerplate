import { Study, User } from '@prisma/client'
import { axios } from 'utils/axios'

export const getStudies = async (): Promise<(Study & { coordinator: User })[]> => {
	const response = await axios.get('/studies')
	return response.data
}
