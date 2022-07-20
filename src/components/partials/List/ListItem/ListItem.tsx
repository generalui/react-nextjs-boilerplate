import cn from 'classnames'
import { ListItemProps } from './ListItem.types'

export const ListItem = <DataType extends object>({
	className,
	columns,
	itemData,
	testId = 'ListItem',
	concise
}: ListItemProps<DataType>) => (
	<div data-testid={testId} className={concise ? 'block border-b col-span-12 last:border-b-0' : ''}>
		<div className={cn('p-6 bg-white rounded-2xl items-center', concise && 'px-0 py-2', className)}>
			{columns.map((column) => (
				<div className={`col-span-${column.width} ${column.className}`} key={`${column.title}`}>
					{itemData[column.key as keyof DataType]}
				</div>
			))}
		</div>
	</div>
)
