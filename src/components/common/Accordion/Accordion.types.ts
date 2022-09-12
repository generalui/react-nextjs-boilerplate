import { CommonProps } from 'types/CommonProps'
import { IconProps } from 'common/Icon/Icon.types'

export interface AccordionProps extends CommonProps {
	isActive?: true
	title: string
	iconProps?: {
		className?: string
		icon: IconProps['icon']
		size?: IconProps['size']
		wrapperClass?: string
	}
}
