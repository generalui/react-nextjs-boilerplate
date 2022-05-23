import { ReactNode } from 'react'

export interface CommonProps {
	className?: string
	children?: ReactNode
	onClick?: () => void
}
