import { StudyDataType } from '@prisma/client'
import { Study } from 'types/Study'
import { SelectOptionsType } from 'types/index'
import { useText } from './useText'

const defaultDataTypes: StudyDataType[] = ['consents', 'geneticData', 'healthRecords', 'specimens']
type UseStudyDataTypes = (studyDataTypes?: Study['dataTypes']) => SelectOptionsType[]

/**
 * Takes in a list of datatypes from a study and returns a list of select options
 * @param initialDataTypes Initial data types to use
 * @returns
 */
export const useStudyDataTypes: UseStudyDataTypes = (initialDataTypes = defaultDataTypes) => {
	const { t: common } = useText('common.dataTypes')

	return initialDataTypes.map((dataType: StudyDataType) => {
		return { label: common(`${dataType}.label`), value: dataType }
	})
}
