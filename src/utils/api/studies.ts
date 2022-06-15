import { Study, User } from '@prisma/client'
import axios from 'axios'

export const getStudies = async (): Promise<(Study & { coordinator: User })[]> => {
	const response = await axios.get('/api/studies')
	return response.data
}
