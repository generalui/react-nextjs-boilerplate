import * as OutlinedIcons from '@heroicons/react/24/outline'
import * as SolidIcons from '@heroicons/react/24/solid'
import cn from 'classnames'
import { IconProps } from './Icon.types'
import * as InternalIcons from './iconMap'
import { iconVariants } from './variants'

const isHiIcon = (icon: string): icon is keyof typeof SolidIcons => {
	return icon in SolidIcons
}

export const Icon = ({ className, icon, outlined, size = 'md', testId = 'Icon' }: IconProps) => {
	let Icon = null

	if (isHiIcon(icon)) {
		Icon = outlined ? OutlinedIcons[icon] : SolidIcons[icon]
	} else {
		Icon = InternalIcons[icon]
	}

	return Icon ? (
		<Icon
			className={cn(
				'flex-shrink-0 flex items-center justify-center',
				iconVariants[size],
				className
			)}
			aria-hidden='true'
			data-testid={testId}
		/>
	) : null
}
