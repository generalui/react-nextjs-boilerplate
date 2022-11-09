import { CommonProps } from 'types/CommonProps'
import { SelectProps } from 'common/Select/Select.types'

type Item = { label: string; value: string }

export type ItemsSelect = Item[]
export interface SelectInputProps<T> extends CommonProps, SelectProps<T> {
	name: string
	labelClassName?: string
	label?: string
	defaultValue?: { value: unknown; label: string }
	showError?: boolean
}
