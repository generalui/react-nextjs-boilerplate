import { CommonProps } from 'types/CommonProps'

export interface ListProps<DataType extends object> extends Omit<CommonProps, 'children'> {
	columns: { key: string; className?: string; title?: string; width: number }[]
	data: DataType[]
	isLoading?: boolean
	listItemClassName?: string
	sharedClassName?: string
	headerClassName?: string
	concise?: boolean
}
