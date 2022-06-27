import cn from 'classnames'
import { Icon } from 'common/Icon'
import { StatusBadgeProps } from './StatusBadge.types'
import { StatusBadgeVariants } from './variants'

const sizeMap = {
	sm: 'h-6 w-6',
	md: 'h-8 w-8'
}

export const StatusBadge = ({
	className,
	size = 'md',
	testId = 'StatusBadge',
	v
}: StatusBadgeProps) => {
	const badge = StatusBadgeVariants[v]

	return (
		<div
			className={cn(
				'rounded-full flex items-center justify-center text-white',
				sizeMap[size],
				badge.bgClass,
				className
			)}
			data-testid={testId}
		>
			<Icon icon={badge.icon} size={size} outlined />
		</div>
	)
}
