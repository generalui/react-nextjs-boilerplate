import { ReactNode } from 'react'
import { CommonProps } from 'types/CommonProps'

export interface CardProps extends CommonProps {
	title?: ReactNode
	img?: string
	imgAlt?: string
	titleClassName?: string
}
