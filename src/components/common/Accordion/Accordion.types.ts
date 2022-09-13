import { CommonProps } from 'types/CommonProps'
import { IconProps } from 'common/Icon/Icon.types'

export type AccordionIconProps = Pick<IconProps, 'icon' | 'size' | 'className'> & {
	wrapperClass?: string
}

export interface AccordionProps extends CommonProps {
	isActive?: true
	title: string
	iconProps?: AccordionIconProps
}
