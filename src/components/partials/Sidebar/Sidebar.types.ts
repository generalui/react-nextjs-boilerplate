import { CommonProps } from 'types/CommonProps'
import { IconProps } from 'common/Icon/Icon.types'

export interface SidebarProps extends CommonProps {}

export interface SidebarRoute {
	className?: string
	href: string
	icon: IconProps['icon']
	labelKey: string
}
