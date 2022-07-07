import cn from 'classnames'
import { DataTypeLabel } from '../../common/DataTypeLabel'
import { DataTypeContainerProps } from './DataTypeContainer.types'

export const DataTypeContainer = ({
	className,
	tags,
	testId = 'DataTypeContainer'
}: DataTypeContainerProps) => (
	<div
		className={cn('border border-gray-300 p-4 rounded flex gap-4', className)}
		data-testid={testId}
	>
		{tags?.map(({ icon, label, dataType }) => (
			<DataTypeLabel
				className='bg-blue-100 text-blue-600 border border-blue-600 rounded p-1 pl-2 flex gap-2 w-44'
				key={label}
				img={icon as string}
				dataType={dataType}
			>
				{label}
			</DataTypeLabel>
		))}
	</div>
)
