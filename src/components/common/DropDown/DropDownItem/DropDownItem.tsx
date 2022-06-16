import cn from 'classnames'
import { DropDownItemProps } from './DropDownItem.types'

export const DropDownItem = ({
	children,
	className,
	onClick,
	testId = 'DropDownItem'
}: DropDownItemProps) => {
	return (
		<button
			onClick={onClick}
			className={cn('hover:bg-gray-100 py-2 w-full rounded-xl', className)}
			data-testId={testId}
		>
			{children}
		</button>
	)
}
