import { ReactNode } from 'react'
import { CommonProps } from 'types/CommonProps'

export interface Column {
	key: string
	className?: string
	title?: string
	width: number
	transformFunction?: (data: unknown) => ReactNode
}

export interface ListProps<DataType extends object> extends Omit<CommonProps, 'children'> {
	columns: Column[]
	data: DataType[]
	emptyMessage?: string
	isLoading?: boolean
	listItemClassName?: string
	loadingClassName?: string
	sharedClassName?: string
	headerClassName?: string
	concise?: boolean
}
