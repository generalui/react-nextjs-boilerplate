import * as OutlinedIcons from '@heroicons/react/outline'
import * as SolidIcons from '@heroicons/react/solid'
import cn from 'classnames'
import { IconProps } from './Icon.types'

export const Icon = ({ className, icon, outlined, testId = 'Icon', size = 24 }: IconProps) => {
	const Icon = outlined ? OutlinedIcons[icon] : SolidIcons[icon]

	return (
		<Icon
			className={cn('flex-shrink-0', className)}
			aria-hidden='true'
			data-testid={testId}
			width={size}
			height={size}
		/>
	)
}
