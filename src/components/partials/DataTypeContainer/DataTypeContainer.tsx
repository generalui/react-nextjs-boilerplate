import cn from 'classnames'
import { DataTypeLabel } from '../../common/DataTypeLabel'
import { DataTypeContainerProps } from './DataTypeContainer.types'

export const DataTypeContainer = ({
	className,
	tags,
	testId = 'DataTypeContainer'
}: DataTypeContainerProps) => (
	// Min hight added to compensate for empty state without tags
	<div
		className={cn(
			'border border-gray-300 p-4 rounded flex flex-wrap gap-4 min-h-[68px]',
			className
		)}
		data-testid={testId}
	>
		{tags?.map(({ icon, label, dataType }) => (
			<DataTypeLabel
				className='bg-secondary text-button-text-secondary border border-primary rounded p-1 pl-2 pr-2 flex gap-2 width-auto'
				key={label}
				img={icon as string}
				dataType={dataType}
			>
				{label}
			</DataTypeLabel>
		))}
	</div>
)
