import { StatusBadgeProps } from 'partials/StatusBadge/StatusBadge.types'
import { IconProps } from 'common/Icon/Icon.types'

export const StatusBadgeVariants: {
	[key in StatusBadgeProps['v']]: { bgClass: string; icon: IconProps['icon'] }
} = {
	new: { bgClass: 'bg-warning', icon: 'BadgeCheckIcon' },
	approved: { bgClass: 'bg-success', icon: 'BadgeCheckIcon' },
	archived: { bgClass: 'bg-muted', icon: 'ServerIcon' }
}
