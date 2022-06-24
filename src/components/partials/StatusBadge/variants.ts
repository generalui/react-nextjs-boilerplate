import { StatusBadgeProps } from 'partials/StatusBadge/StatusBadge.types'
import { IconProps } from 'common/Icon/Icon.types'

export const StatusBadgeVariants: {
	[key in StatusBadgeProps['v']]: { bgClass: string; icon: IconProps['icon'] }
} = {
	new: { bgClass: 'bg-orange-300', icon: 'BadgeCheckIcon' },
	approved: { bgClass: 'bg-green-400', icon: 'BadgeCheckIcon' },
	archived: { bgClass: 'bg-gray-300', icon: 'ServerIcon' }
}
