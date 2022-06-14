import { ListItemProps } from './ListItem.types'

export const ListItem = <DataType extends { name: string }>({
	className,
	columns,
	itemData,
	testId = 'ListItem'
}: ListItemProps<DataType>) => (
	<div className={`p-6 bg-white rounded-2xl items-center ${className}`} data-testid={testId}>
		{columns.map((column) => (
			<div
				className={`col-span-${column.width} ${column.className}`}
				key={`${itemData.name}-${column.title}`}
			>
				{itemData[column.key]}
			</div>
		))}
	</div>
)
