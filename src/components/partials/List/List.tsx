import cn from 'classnames'
import { useText } from 'hooks/useText'
import { ListItem } from 'partials/List/ListItem'
import { Icon } from 'common/Icon'
import { Loader } from 'common/Loader'
import { ListData, ListProps } from './List.types'

const sharedClasses = 'grid grid-cols-6 lg:grid-cols-12'

export const List = <DataType extends ListData>({
	columns,
	data,
	className,
	indexKey,
	listItemClassName,
	loadingClassName,
	sharedClassName,
	isLoading = false,
	emptyMessage = '',
	testId = 'List',
	concise
}: ListProps<DataType>) => {
	const { t } = useText('studies.list')
	let colWidthAccumulator = 0
	const noDataMessage = emptyMessage || t('noData')

	return (
		<div
			className={cn('flex flex-col', concise && 'px-0 relative', className)}
			data-testid={testId}
		>
			<div
				className={cn(
					sharedClasses,
					'pb-4 px-6 font-semibold text-black text-xs hidden lg:grid gap-10 ',
					concise && 'px-0 pb-2 sticky top-0 bg-white w-full border-b',
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
					)
				})}
			</div>
			<Loader isLoading={isLoading} fallbackClassName={cn('p-12', loadingClassName)}>
				<div className={cn('flex flex-col space-y-4', concise && 'space-y-0')}>
					{!data.length ? (
						<div className='flex flex-col justify-center items-center p-8 text-gray-400'>
							<Icon icon='DocumentTextIcon' size='xl' />
							{noDataMessage}
						</div>
					) : (
						data.map((item) => (
							<ListItem
								className={cn(
									sharedClasses,
									concise ? 'gap-2 lg:gap-10 text-sm' : 'gap-10',
									sharedClassName,
									listItemClassName
								)}
								columns={columns}
								itemData={item}
								key={item[indexKey] as string}
								concise={concise}
							/>
						))
					)}
				</div>
			</Loader>
		</div>
	)
}
