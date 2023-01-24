import { TodoDataType } from '@prisma/client'
import { Todo } from 'types/Todo'
import { SelectOptionsType } from 'types/index'
import { useText } from './useText'

const defaultDataTypes: TodoDataType[] = ['analyses', 'geneticData', 'healthRecords', 'specimens']
type UseTodoDataTypes = (todoDataTypes?: Todo['dataTypes']) => SelectOptionsType[]

/**
 * Takes in a list of datatypes from a todo and returns a list of select options
 * @param initialDataTypes Initial data types to use
 * @returns
 */
export const useTodoDataTypes: UseTodoDataTypes = (initialDataTypes = defaultDataTypes) => {
	const { t: common } = useText('common.dataTypes')

	return initialDataTypes.map((dataType: TodoDataType) => {
		return { label: common(`${dataType}.label`), value: dataType }
	})
}
