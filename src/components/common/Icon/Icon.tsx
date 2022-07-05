import * as OutlinedIcons from '@heroicons/react/outline'
import * as SolidIcons from '@heroicons/react/solid'
import cn from 'classnames'
import { iconVariants } from 'common/Icon/variants'
import { IconProps } from './Icon.types'

export const Icon = ({ className, icon, outlined, size = 'md', testId = 'Icon' }: IconProps) => {
	const Icon = outlined ? OutlinedIcons[icon] : SolidIcons[icon]

	return (
		<Icon
			className={cn('flex-shrink-0', iconVariants[size], className)}
			aria-hidden='true'
			data-testid={testId}
		/>
	)
}
