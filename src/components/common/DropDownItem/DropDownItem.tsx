import cn from 'classnames'
import { DropDownItemProps } from './DropDownItem.types'

export const DropDownItem = ({
	children,
	className,
	testId = 'DropDownItem'
}: DropDownItemProps) => {
	return (
		<div
			className={cn(
				'block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white',
				className
			)}
			data-testid={testId}
		>
			{children}
		</div>
	)
}
