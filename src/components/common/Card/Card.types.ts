import { ReactNode } from 'react'
import { CommonProps } from 'types/CommonProps'
import { IconProps } from 'common/Icon/Icon.types'

export interface CardProps extends CommonProps {
	action?: ReactNode
	headerClassName?: string
	iconProps?: {
		icon: IconProps['icon']
		wrapperClass?: string
	}
	img?: string
	imgAlt?: string
	imgIcon?: string
	imgIconAlt?: string
	title?: ReactNode
	titleClassName?: string
}

export interface HeaderIconProps {
	icon: IconProps['icon']
	size?: IconProps['size']
	wrapperClass?: string
}
