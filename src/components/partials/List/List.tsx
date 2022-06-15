import cn from 'classnames'
import { ListItem } from 'components/partials/List/ListItem'
import { ListProps } from './List.types'

const sharedClasses = 'grid px-6 grid-cols-6 lg:grid-cols-12 gap-10'

export const List = <DataType extends { name: string }>({
	columns,
	data,
	className,
	testId = 'List'
}: ListProps<DataType>) => {
	let colWidthAccumulator = 0

	return (
		<div className={cn('gap-4 flex flex-col', className)} data-testid={testId}>
			<div className={cn('font-semibold text-black text-xs hidden lg:grid', sharedClasses)}>
				{columns.map((column) => {
					// Merge the width of columns without a title to the next titled column
					if (!column.title) {
						colWidthAccumulator += column.width
						return
					}
					const columnWidth = colWidthAccumulator + column.width
					colWidthAccumulator = 0

					return (
						<div className={cn('truncate', `col-span-${columnWidth}`)} key={column.title}>
							{column.title}
						</div>
					)
				})}
			</div>
			{data.map((item) => (
				<ListItem className={sharedClasses} columns={columns} itemData={item} key={item.name} />
			))}
		</div>
	)
}
