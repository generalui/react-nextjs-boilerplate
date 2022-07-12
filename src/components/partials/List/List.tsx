import cn from 'classnames'
import { ListItem } from 'partials/List/ListItem'
import { Loader } from 'common/Loader'
import { Spinner } from 'common/Spinner'
import { ListProps } from './List.types'

const sharedClasses = 'grid grid-cols-6 lg:grid-cols-12'

export const List = <DataType extends object>({
	columns,
	data,
	className,
	listItemClassName,
	sharedClassName,
	isLoading = false,
	testId = 'List',
	concise
}: ListProps<DataType>) => {
	let colWidthAccumulator = 0

	return (
		<div
			className={cn('flex flex-col px-6 lg:px-0', concise && 'px-0', className)}
			data-testid={testId}
		>
			<div
				className={cn(
					sharedClasses,
					'mb-4 px-6 font-semibold text-black text-xs hidden lg:grid gap-10',
					concise && 'px-2',
					sharedClassName
				)}
			>
				{columns.map((column) => {
					// Merge the width of columns without a title to the next titled column
					if (!column.title) {
						colWidthAccumulator += column.width
						return
					}
					const columnWidth = colWidthAccumulator + column.width
					colWidthAccumulator = 0

					return (
						<>
							<div
								className={cn(
									'truncate',
									columnWidth && `col-span-${columnWidth}`,
									concise && 'text-gray-500'
								)}
								key={column.key}
							>
								{column.title}
							</div>
						</>
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
				<div className={cn('flex flex-col space-y-4', concise && 'space-y-0')}>
					{data.map((item, index) => (
						<ListItem
							className={cn(
								sharedClasses,
								!concise && 'gap-10',
								concise && 'gap-2 lg:gap-10',
								sharedClassName,
								listItemClassName
							)}
							columns={columns}
							itemData={item}
							// @ts-expect-error We don't know any key info except the index for this item
							key={index}
							concise={concise}
						/>
					))}
				</div>
			</Loader>
		</div>
	)
}
