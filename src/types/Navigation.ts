import { Roles } from 'types/User'
import { DropDownItemProps } from 'common/DropDown/DropDownItem/DropDownItem.types'
import { IconProps } from 'common/Icon/Icon.types'

type DropDownItem = DropDownItemProps & { href: string; onClick?: () => void }

export interface SidebarRoute {
	className?: string
	href: string
	icon: IconProps['icon']
	labelKey: string
	role: Roles
	dropdownItems?: DropDownItem[]
}
