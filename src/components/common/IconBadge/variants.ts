import { IconProps } from 'common/Icon/Icon.types'
import { IconBadgeProps } from 'common/IconBadge/IconBadge.types'

export const iconBadgeVariants: {
	[key in IconBadgeProps['v']]: { bgClass: string; icon: IconProps['icon'] }
} = {
	new: { bgClass: 'bg-orange-300', icon: 'BadgeCheckIcon' },
	approved: { bgClass: 'bg-green-400', icon: 'BadgeCheckIcon' },
	archived: { bgClass: 'bg-gray-300', icon: 'ServerIcon' }
}
