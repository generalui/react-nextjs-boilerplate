import * as OutlinedIcons from '@heroicons/react/outline'
import * as SolidIcons from '@heroicons/react/solid'
import cn from 'classnames'
import * as InternalIcons from 'public/icons'
import { iconVariants } from 'common/Icon/variants'
import { IconProps } from './Icon.types'

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
