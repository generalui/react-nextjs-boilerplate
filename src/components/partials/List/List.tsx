import { ListItem } from 'components/partials/List/ListItem'
import { ListProps } from './List.types'

const sharedClasses = 'grid px-6 grid-cols-6 lg:grid-cols-12 gap-10'

export const List = <DataType extends { name: string }>({
	columns,
	data,
	className,
	testId = 'List'
}: ListProps<DataType>) => {
	return (
		<div className={`gap-4 flex flex-col ${className}`} data-testid={testId}>
			<div className={`${sharedClasses} font-semibold text-black text-xs hidden lg:grid`}>
				{columns.map((column) => (
					<div className={`col-span-${column.width} truncate`} key={column.title}>
						{column.title}
					</div>
				))}
			</div>
			{data.map((item) => (
				<ListItem className={sharedClasses} columns={columns} itemData={item} key={item.name} />
			))}
		</div>
	)
}
