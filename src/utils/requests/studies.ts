import {
	AggregatedStudyData,
	ApiDataVault,
	ApiStudiesResponse,
	ApiStudy,
	DataVault,
	DataVaultInput,
	PaginatedResponse,
	QueryOptions,
	Study,
	StudyInput
} from 'types/index'
import { axios } from 'utils/client/axios'
import { axiosWithFiles } from 'utils/client/axiosWithFiles'
import { axiosWithQuery } from 'utils/client/axiosWithQuery'
import { standardizeApiStudy, standardizeDataVault } from 'utils/models/studies'

export const getStudies = async (
	query?: QueryOptions
): Promise<PaginatedResponse & { studies: Study[] }> => {
	const response = await axiosWithQuery<ApiStudiesResponse>('/studies', query)
	const { count, hasMore, studies } = response.data

	return {
		count,
		hasMore,
		studies: studies.map(standardizeApiStudy)
	}
}

export const getStudy = async (studyId: string): Promise<Study> => {
	const response = await axios.get<ApiStudy>(`/studies/${studyId}`)

	if (!response.data) {
		throw new Error('Study not found')
	}

	return standardizeApiStudy(response.data)
}

export const getStudyDataVault = async (studyId: string): Promise<DataVault[]> => {
	const response = await axios.get<ApiDataVault[]>(`/studies/${studyId}/data-vault`)

	if (!response.data) {
		throw new Error('Study not found')
	}

	return response.data.map(standardizeDataVault)
}

export const postStudyDataVault = async (
	studyId: string,
	{ dataVault, dataType }: DataVaultInput
) => {
	const response = await axiosWithFiles<ApiStudy>(
		`/studies/${studyId}/data-vault`,
		{ dataType },
		{ dataVault: dataVault as File[] },
		'post'
	)

	return standardizeApiStudy(response.data)
}

export const createStudy = async ({ image, documentation, ...newStudy }: StudyInput) => {
	const response = await axiosWithFiles<ApiStudy>(
		'/studies',
		newStudy,
		{ image, documentation: documentation as File[] },
		'post'
	)
	return standardizeApiStudy(response.data)
}

export const updateStudy = async (
	studyId: string,
	{ image, documentation, ...updatedStudy }: Partial<StudyInput>
): Promise<Study> => {
	const response = await axiosWithFiles<ApiStudy>(
		`/studies/${studyId}`,
		updatedStudy,
		{ image, documentation: documentation as File[] },
		'patch'
	)

	return standardizeApiStudy(response.data)
}

export const getAggregatedStudyData = async (): Promise<AggregatedStudyData> => {
	const response = await axios.get<AggregatedStudyData>('/aggregated-study-data')
	return response.data
}
