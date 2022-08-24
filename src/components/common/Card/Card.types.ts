import { ReactNode } from 'react'
import { CommonProps } from 'types/CommonProps'
import { IconProps } from 'common/Icon/Icon.types'

export interface CardProps extends CommonProps {
	action?: ReactNode
	headerClassName?: string
	iconProps?: {
		className?: string
		icon: IconProps['icon']
		size?: IconProps['size']
		wrapperClass?: string
	}
	img?: string
	imgAlt?: string
	title?: ReactNode
	titleClassName?: string
}

export interface HeaderIconProps {
	className?: string
	icon: IconProps['icon']
	size?: IconProps['size']
	wrapperClass?: string
}
