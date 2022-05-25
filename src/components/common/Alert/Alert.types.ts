import { CommonProps } from 'types/CommonProps'

export interface AlertProps extends CommonProps {
	info?: boolean
	danger?: boolean
	success?: boolean
	warning?: boolean
	muted?: boolean
}
