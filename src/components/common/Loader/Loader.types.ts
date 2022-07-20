import { ReactNode } from 'react'
import { CommonProps } from 'types/CommonProps'

export interface LoaderProps extends CommonProps {
	fallback?: ReactNode
	isLoading: boolean
	fallbackClassName?: string
}
