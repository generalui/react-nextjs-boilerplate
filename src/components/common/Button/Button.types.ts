import { CommonProps } from 'types/CommonProps'

export interface ButtonProps extends CommonProps {
	primary?: boolean
	secondary?: boolean
	danger?: boolean
	warn?: boolean
	success?: boolean
	type?: 'button' | 'submit' | 'reset' | undefined
	disabled?: boolean
}
