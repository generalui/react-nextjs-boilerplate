import { CommonProps } from 'types/CommonProps'
import { IconProps } from 'common/Icon/Icon.types'

export interface DropDownItemWithIconProps extends CommonProps {
	icon: IconProps['icon']
	label: string
}
