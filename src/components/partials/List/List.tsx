import cn from 'classnames'
import { ListItem } from 'partials/List/ListItem'
import { Loader } from 'common/Loader'
import { Spinner } from 'common/Spinner'
import { ListProps } from './List.types'

const sharedClasses = 'grid px-6 grid-cols-6 lg:grid-cols-12 gap-10'

export const List = <DataType extends object>({
	columns,
	data,
	className,
	isLoading = false,
	testId = 'List'
}: ListProps<DataType>) => {
	let colWidthAccumulator = 0

	return (
		<div className={cn('gap-4 flex flex-col px-6 lg:px-0', className)} data-testid={testId}>
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
			<Loader
				isLoading={isLoading}
				fallback={
					<div className='flex items-center justify-center p-12'>
						<Spinner />
					</div>
				}
			>
				{data.map((item, index) => (
					// @ts-expect-error We don't know any key info except the index for this item
					<ListItem className={sharedClasses} columns={columns} itemData={item} key={index} />
				))}
			</Loader>
		</div>
	)
}
