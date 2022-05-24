import { CommonProps } from 'types/CommonProps'

export interface InputProps extends CommonProps {
	value?: string | number | readonly string[] | undefined
	onChange?: (e: any) => void
	type?: string
	placeholder?: string
}
