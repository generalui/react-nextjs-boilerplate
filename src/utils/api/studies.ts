import { Study, StudyInput } from 'types/index'
import { axios } from 'utils/axios'

export const getStudies = async (): Promise<Study[]> => {
	const response = await axios.get('/studies')
	return response.data
}

export const getStudy = async (studyId: string): Promise<Study> => {
	const response = await axios.get(`/studies/${studyId}`)
	return { ...response.data, endDate: new Date(response.data.endDate) }
}

export const createStudy = async (newStudy: StudyInput) => {
	const response = await axios.post('/studies', newStudy)
	return response.data
}

export const updateStudy = async (
	studyId: string,
	updatedStudy: Partial<Study>
): Promise<Study> => {
	const response = await axios.patch(`/studies/${studyId}`, updatedStudy)
	return response.data
}
