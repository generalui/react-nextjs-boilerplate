import cn from 'classnames'
import { Button } from 'components/common/Button'
import { DropDownItemProps } from './DropDownItem.types'

export const DropDownItem = ({
	label,
	className,
	onClick,
	testId = 'DropDownItem'
}: DropDownItemProps) => {
	return (
		<Button
			onClick={onClick}
			className={cn(className, 'w-full rounded-xl')}
			testId={testId}
			v='transparent'
		>
			{label}
		</Button>
	)
}
