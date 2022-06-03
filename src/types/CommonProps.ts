import { ReactNode } from 'react'

export interface CommonProps {
	id?: string | undefined
	className?: string
	children?: ReactNode
	onClick?: () => void
	['data-testid']?: string
	type?: string
}
