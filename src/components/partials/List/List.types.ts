import { ReactNode } from 'react'
import { CommonProps } from 'types/CommonProps'

export type ListData = Record<string, ReactNode>

type StringKeys<DataType extends ListData> = Extract<keyof DataType, string>

export interface Column<DataType extends ListData> {
	key: StringKeys<DataType>
	className?: string
	title?: string
	width: number
	transformFunction?: (value: unknown, data: DataType) => ReactNode
}

export interface ListProps<DataType extends ListData> extends Omit<CommonProps, 'children'> {
	columns: Column<DataType>[]
	data: DataType[]
	emptyMessage?: string
	indexKey: StringKeys<DataType>
	isLoading?: boolean
	listItemClassName?: string
	loadingClassName?: string
	sharedClassName?: string
	headerClassName?: string
	concise?: boolean
}
