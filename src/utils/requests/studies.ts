import { ApiStudy, Study, StudyInput } from 'types/index'
import { axios, withFile } from 'utils/client/axios'
import { standardizeApiStudy } from 'utils/models/studies'

export const getStudies = async (): Promise<Study[]> => {
	const response = await axios.get<ApiStudy[]>('/studies')
	return response.data.map((study) => standardizeApiStudy(study))
}

export const getStudy = async (studyId: string): Promise<Study> => {
	const response = await axios.get<ApiStudy>(`/studies/${studyId}`)

	if (!response.data) {
		throw new Error('Study not found')
	}

	return standardizeApiStudy(response.data)
}

export const createStudy = async ({ image, documentation, ...newStudy }: StudyInput) => {
	const response = await withFile<ApiStudy>('/studies', newStudy, image, documentation as File[])
	return standardizeApiStudy(response.data)
}

export const updateStudy = async (
	studyId: string,
	{ image, documentation, ...updatedStudy }: Partial<StudyInput>
): Promise<Study> => {
	const response = await withFile<ApiStudy>(
		`/studies/${studyId}`,
		updatedStudy,
		image,
		documentation as File[],
		'patch'
	)

	return standardizeApiStudy(response.data)
}
