import { CommonProps } from 'types/CommonProps'
import { IconProps } from 'common/Icon/Icon.types'

export interface SidebarLinkProps extends CommonProps {
	href: string
	icon: IconProps['icon']
	isSelected?: boolean
}
