import cn from 'classnames'
import { useText } from 'hooks/useText'
import { ListItem } from 'partials/List/ListItem'
import { Icon } from 'common/Icon'
import { Loader } from 'common/Loader'
import { Spinner } from 'common/Spinner'
import { ListProps } from './List.types'

const sharedClasses = 'grid grid-cols-6 lg:grid-cols-12'

export const List = <DataType extends object>({
	columns,
	data,
	className,
	listItemClassName,
	loadingClassName,
	sharedClassName,
	isLoading = false,
	testId = 'List',
	concise
}: ListProps<DataType>) => {
	const { t } = useText('studies.documentation')
	let colWidthAccumulator = 0

	return (
		<div
			className={cn('flex flex-col px-6 lg:px-0', concise && 'px-0 relative', className)}
			data-testid={testId}
		>
			<div
				className={cn(
					sharedClasses,
					'pb-4 px-6 font-semibold text-black text-xs hidden lg:grid gap-10 border-b',
					concise && 'px-0 pb-2 sticky top-0 bg-white w-full',
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
					<div className={cn('flex items-center justify-center p-12', loadingClassName)}>
						<Spinner />
					</div>
				}
			>
				<div className={cn('flex flex-col space-y-4', concise && 'space-y-0')}>
					{!data.length ? (
						<div className='flex flex-col justify-center items-center p-8 text-gray-400'>
							<Icon icon='DocumentTextIcon' size='xl' />
							{t('noDocuments')}
						</div>
					) : (
						data.map((item, index) => (
							<ListItem
								className={cn(
									sharedClasses,
									concise ? 'gap-2 lg:gap-10' : 'gap-10',
									sharedClassName,
									listItemClassName
								)}
								columns={columns}
								itemData={item}
								// TODO: refactor list to accept items that have an id, to be used as a key
								// @ts-expect-error We don't know any key info except the index for this item
								key={index}
								concise={concise}
							/>
						))
					)}
				</div>
			</Loader>
		</div>
	)
}
