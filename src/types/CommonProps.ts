import { ReactNode } from 'react'

export interface CommonProps {
	id?: string | undefined
	className?: string
	children?: ReactNode
	onClick?: () => void
	key?: string
	center?: boolean
	['data-testid']?: string
	testId?: string
}
