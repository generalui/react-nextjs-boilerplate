import { CommonProps } from 'types/CommonProps'

export interface PaginationProps extends CommonProps {
	pageSize?: number
	initialPage?: number
	totalCount?: number
	name?: string
	onChange?: (page: number) => void
	showDetails?: boolean
	visibleCount?: number
}
