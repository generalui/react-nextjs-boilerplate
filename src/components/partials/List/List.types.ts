import { CommonProps } from 'types/CommonProps'

export type Column = { key: string; className?: string; title?: string; width: number }

export interface ListProps<DataType extends object> extends Omit<CommonProps, 'children'> {
	columns: Column[]
	data: DataType[]
	isLoading?: boolean
	listItemClassName?: string
	sharedClassName?: string
	headerClassName?: string
	concise?: boolean
}
