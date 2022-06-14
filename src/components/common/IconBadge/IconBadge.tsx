import cn from 'classnames'
import { IconProps } from 'components/common/Icon/Icon.types'
import { Icon } from 'common/Icon'
import { IconBadgeProps } from './IconBadge.types'

const badgeMap: {
	[key in IconBadgeProps['variant']]: { bgClass: string; icon: IconProps['icon'] }
} = {
	new: { bgClass: 'bg-orange-300', icon: 'CheckCircleIcon' },
	approved: { bgClass: 'bg-green-400', icon: 'CheckCircleIcon' },
	archived: { bgClass: 'bg-gray-300', icon: 'ServerIcon' }
}

export const IconBadge = ({ className, testId = 'IconBadge', variant }: IconBadgeProps) => {
	const badge = badgeMap[variant]

	return (
		<div
			className={cn(
				'rounded-full flex items-center justify-center w-8 h-8',
				badge.bgClass,
				className
			)}
			data-testid={testId}
		>
			<Icon icon={badge.icon} outlined />
		</div>
	)
}
