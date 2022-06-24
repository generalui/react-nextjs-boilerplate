import { CommonProps } from 'types/CommonProps'
import { buttonVariants } from './variants'

export interface ButtonProps extends CommonProps {
	primary?: boolean
	secondary?: boolean
	danger?: boolean
	warn?: boolean
	success?: boolean
	type?: 'button' | 'submit' | 'reset' | undefined
	disabled?: boolean
	v?: keyof typeof buttonVariants
}
