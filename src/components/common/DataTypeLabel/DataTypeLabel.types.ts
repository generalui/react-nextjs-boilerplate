import { CommonProps } from 'types/CommonProps'
import { IconProps } from 'common/Icon/Icon.types'

export interface DataTypeLabelProps extends CommonProps {
	img?: string
	dataType: string
	iconClassname?: string
	icon?: IconProps['icon']
	size?: IconProps['size']
}
