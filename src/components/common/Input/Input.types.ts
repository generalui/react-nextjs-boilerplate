import { CommonProps } from 'types/CommonProps'
import { OnChangeValue } from 'types/index'

export interface InputProps extends CommonProps {
	onChange?: (value: OnChangeValue, previousValue: OnChangeValue) => void
	type?: string
	placeholder?: string
	name: string
}

export interface InputPropsv1 extends CommonProps {
	value?: string | number | readonly string[] | undefined
	onChange?: (e: any) => void
	type?: string
	placeholder?: string
}
