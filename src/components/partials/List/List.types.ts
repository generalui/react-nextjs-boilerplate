import { CommonProps } from 'types/CommonProps'

export interface ListProps<DataType extends { name: string }>
	extends Omit<CommonProps, 'children'> {
	columns: {
		key: keyof DataType
		className: string
		contentClassName?: string | string[]
		title: string
	}[]
	data: DataType[]
}
