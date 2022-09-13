import { CommonProps } from 'types/CommonProps'

export interface ToggleButtonProps extends CommonProps {
	activeLabel: string
	inactiveLabel: string
	name: string
	isActive?: boolean
}
