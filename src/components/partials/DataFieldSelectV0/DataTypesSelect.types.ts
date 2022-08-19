import { CommonProps } from 'types/CommonProps'
import { SelectProps } from 'common/Select/Select.types'

export interface DataTypesSelectProps<T> extends CommonProps, SelectProps<T> {
	name: string
	labelClassName?: string
	label?: string
}
