import { ReactNode } from 'react'
import { CommonProps } from 'types/CommonProps'
import { CardProps } from 'common/Card/Card.types'

export type ListData = Record<string, ReactNode>

type StringKeys<DataType = ListData> = Extract<keyof DataType, string>

export interface Column<DataType = ListData> {
	key: StringKeys<DataType>
	className?: string
	title?: string
	width: number
	transformFunction?: (value: unknown, data: DataType) => ReactNode
	headerClassName?: string
}

export interface BaseListProps extends Omit<CommonProps, 'children'> {
	action?: CardProps['action']
	concise?: boolean
	iconProps?: CardProps['iconProps']
	isLoading?: boolean
	title?: string
}

export interface ListProps<DataType extends ListData> extends BaseListProps {
	columns: Column<DataType>[]
	data: DataType[]
	emptyMessage?: string
	indexKey: StringKeys<DataType>
	listItemClassName?: string
	loadingClassName?: string
	sharedClassName?: string
	headerClassName?: string
}
