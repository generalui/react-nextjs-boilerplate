import cn from 'classnames'
import { Tag } from './Tag'
import { TagContainerProps } from './TagContainer.types'

export const TagContainer = ({ className, tags, testId = 'TagContainer' }: TagContainerProps) => (
	<div className={cn('border border-gray-300 p-4 rounded flex', className)} data-testid={testId}>
		{tags.map(({ icon, label }, index) => (
			// @ts-expect-error We don't know any key info except the index for this item
			<Tag icon={icon} key={index}>
				{label}
			</Tag>
		))}
	</div>
)
