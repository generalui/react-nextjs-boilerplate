import * as OutlinedIcons from '@heroicons/react/outline'
import * as SolidIcons from '@heroicons/react/solid'
import cn from 'classnames'
import { IconProps } from './Icon.types'

const sizeMap = {
	sm: 'h-5 w-5',
	md: 'h-6 w-6'
}

export const Icon = ({ className, icon, outlined, size = 'md', testId = 'Icon' }: IconProps) => {
	const Icon = outlined ? OutlinedIcons[icon] : SolidIcons[icon]

	return (
		<Icon
			className={cn('flex-shrink-0', sizeMap[size], className)}
			aria-hidden='true'
			data-testid={testId}
		/>
	)
}
