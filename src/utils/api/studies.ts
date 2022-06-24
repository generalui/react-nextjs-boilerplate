import { Study } from 'types/index'
import { axios } from 'utils/axios'

export const getStudies = async (): Promise<Study[]> => {
	const response = await axios.get('/studies')
	return response.data
}

export const getStudy = async (studyId: string): Promise<Study> => {
	const response = await axios.get(`/studies/${studyId}`)
	return response.data
}
