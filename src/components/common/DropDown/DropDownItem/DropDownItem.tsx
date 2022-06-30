import cn from 'classnames'
import { Button } from 'common/Button'
import { DropDownItemProps } from './DropDownItem.types'

export const DropDownItem = ({
	label,
	className,
	onClick,
	testId = 'DropDownItem'
}: DropDownItemProps) => (
	<Button
		onClick={onClick}
		className={cn(className, 'w-full rounded-xl flex items-center gap-3')}
		testId={testId}
		v='transparent'
	>
		{label}
	</Button>
)
