import { ReactNode } from 'react'

export interface CommonProps {
	id?: string | undefined
	className?: string
	children?: ReactNode
	onClick?: () => void
	key?: string
	['data-testid']?: string
	type?: string
	testId?: string
}
