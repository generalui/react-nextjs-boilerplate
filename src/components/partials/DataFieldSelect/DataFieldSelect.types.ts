import { CommonProps } from 'types/CommonProps'
import { SelectProps } from 'common/Select/Select.types'

export interface DataFieldSelectProps<T> extends CommonProps, SelectProps<T> {
	name: string
	labelClassName?: string
	defaultValue?: { value: unknown; label: string; meta?: Record<string, unknown> }
	label?: string
	showError?: boolean
}
