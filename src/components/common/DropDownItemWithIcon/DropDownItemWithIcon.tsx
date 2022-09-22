import cn from 'classnames'
import { Icon } from 'common/Icon'
import { DropDownItemWithIconProps } from './DropDownItemWithIcon.types'

export const DropDownItemWithIcon = ({
	icon,
	label,
	className,
	testId = 'DropDownItemWithIcon'
}: DropDownItemWithIconProps) => (
	<div className={cn('flex items-center gap-1', className)} data-testid={testId}>
		<Icon icon={icon} size='sm' />
		{label}
	</div>
)
