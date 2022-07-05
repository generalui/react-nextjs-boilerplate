import cn from 'classnames'
import { DataTypeLabel } from '../../common/DataTypeLabel'
import { TagContainerProps } from './TagContainer.types'

export const TagContainer = ({ className, tags, testId = 'TagContainer' }: TagContainerProps) => (
	<div
		className={cn('border border-gray-300 p-4 rounded flex gap-4', className)}
		data-testid={testId}
	>
		{tags?.map(({ icon, label }, index) => (
			<DataTypeLabel
				className='bg-blue-100 text-blue-600 border border-blue-600 rounded p-1 pl-2 flex gap-2 w-44'
				// @ts-expect-error We don't know any key info except the index for this item
				key={index}
				img={icon as string}
			>
				{label}
			</DataTypeLabel>
		))}
	</div>
)
