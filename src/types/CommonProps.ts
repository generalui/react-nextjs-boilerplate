import { ReactNode } from 'react'

export interface CommonProps {
	id?: string | undefined
	className?: string
	children?: ReactNode
	key?: string
	center?: boolean
	['data-testid']?: string
	testId?: string
}
