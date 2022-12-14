import { CommonProps } from 'types/CommonProps'
import { SelectProps } from 'common/Select/Select.types'

export interface UserSelectProps<T> extends CommonProps, SelectProps<T> {
	labelClassName?: string
	label?: string
	name: string
	userType?: 'admin' | 'participant' | 'all'
}
