import { CommonProps } from 'types/CommonProps'
import { Roles } from 'utils/routes'

export interface DropDownItemProps extends CommonProps {
	label: React.ReactNode
	value: string
	role: Roles
}
