import { CommonProps } from 'types/CommonProps'

export interface JsonViewerProps extends CommonProps {
	error?: boolean
	isLoading?: boolean
	data?: Record<string, unknown> | Record<string, unknown>[]
	loadingClassName?: boolean
}
