import { ApiStudy, Study, StudyInput } from 'types/index'
import { axios } from 'utils/axios'
import { standardizeApiStudy } from 'utils/studies'

export const getStudies = async (): Promise<Study[]> => {
	const response = await axios.get<ApiStudy[]>('/studies')
	return response.data.map((study) => standardizeApiStudy(study))
}

export const getStudy = async (studyId: string): Promise<Study> => {
	const response = await axios.get<ApiStudy>(`/studies/${studyId}`)
	return standardizeApiStudy(response.data)
}

export const createStudy = async (newStudy: StudyInput) => {
	const response = await axios.post<ApiStudy>('/studies', newStudy)
	return standardizeApiStudy(response.data)
}

export const updateStudy = async (
	studyId: string,
	updatedStudy: Partial<StudyInput>
): Promise<Study> => {
	const response = await axios.patch<ApiStudy>(`/studies/${studyId}`, updatedStudy)
	return standardizeApiStudy(response.data)
}
