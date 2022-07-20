import {
	AggregatedStudyData,
	ApiDataVault,
	ApiStudy,
	DataVault,
	Study,
	StudyInput
} from 'types/index'
import { axios, withFile } from 'utils/client/axios'
import { standardizeApiStudy, standardizeDataVault } from 'utils/models/studies'

export const getStudies = async (query?: string): Promise<Study[]> => {
	const response = await axios.get<ApiStudy[]>(`/studies${query || ''}`)
	return response.data.map(standardizeApiStudy)
}

export const getStudy = async (studyId: string): Promise<Study> => {
	const response = await axios.get<ApiStudy>(`/studies/${studyId}`)

	if (!response.data) {
		throw new Error('Study not found')
	}

	return standardizeApiStudy(response.data)
}

export const getStudyDataVault = async (studyId: string): Promise<DataVault[]> => {
	const response = await axios.get<ApiDataVault[]>(`/studies/${studyId}/dataVault`)

	if (!response.data) {
		throw new Error('Study not found')
	}

	return response.data.map(standardizeDataVault)
}

export const createStudy = async ({ image, documentation, ...newStudy }: StudyInput) => {
	const response = await withFile<ApiStudy>(
		'/studies',
		newStudy,
		image,
		'post',
		documentation as File[]
	)
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
		'patch',
		documentation as File[]
	)

	return standardizeApiStudy(response.data)
}

export const getAggregatedStudyData = async (): Promise<AggregatedStudyData> => {
	const response = await axios.get<AggregatedStudyData>('/aggregated-study-data')
	return response.data
}
