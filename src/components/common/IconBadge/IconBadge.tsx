import cn from 'classnames'
import { Icon } from 'common/Icon'
import { IconBadgeProps } from './IconBadge.types'
import { iconBadgeVariants } from './variants'

const sizeMap = {
	sm: 'h-6 w-6',
	md: 'h-8 w-8'
}

export const IconBadge = ({ className, size = 'md', testId = 'IconBadge', v }: IconBadgeProps) => {
	const badge = iconBadgeVariants[v]

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
