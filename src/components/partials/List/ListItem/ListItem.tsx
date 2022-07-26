import cn from 'classnames'
import { get } from 'lodash'
import { ListData } from 'partials/List/List.types'
import { ListItemProps } from './ListItem.types'

export const ListItem = <DataType extends ListData>({
	className,
	columns,
	itemData,
	testId = 'ListItem',
	concise
}: ListItemProps<DataType>) => (
	<div data-testid={testId} className={concise ? 'block border-b col-span-12 last:border-b-0' : ''}>
		<div
			className={cn(
				'p-6 bg-white rounded-2xl items-center',
				concise && 'px-0 py-2 min-h-[50px]',
				className
			)}
		>
			{columns.map((column) => {
				const value = get(itemData, column.key.split('.'))
				const transformedValue = column.transformFunction
					? column.transformFunction(value, itemData)
					: value

				return (
					<div className={cn(`col-span-${column.width}`, column.className)} key={`${column.title}`}>
						{transformedValue}
					</div>
				)
			})}
		</div>
	</div>
)
