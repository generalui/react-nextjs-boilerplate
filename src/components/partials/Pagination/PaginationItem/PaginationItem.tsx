import cn from 'classnames'
import { DOTS } from 'hooks/usePagination'
import { PaginationItemProps } from './PaginationItem.types'

export const PaginationItem = ({
	children,
	className,
	testId = 'PaginationItem',
	active,
	disabled,
	onClick
}: PaginationItemProps) => {
	const placeholderItem = children === DOTS
	const isDisabled = disabled || placeholderItem || active

	// TODO: this should use the Button component
	return (
		<li>
			<button
				onClick={onClick}
				data-testid={testId}
				className={cn(
					'py-2 px-3 ml-0 leading-tight text-gray-500 border border-gray-300 dark:border-gray-700 dark:text-gray-400  ',
					className,
					active
						? 'bg-blue-50 border-blue-600 text-blue-600 '
						: isDisabled && !placeholderItem
						? 'bg-gray-100'
						: 'bg-white',
					isDisabled ? '' : 'hover:text-gray-700 dark:hover:text-white  hover:bg-gray-100'
				)}
				disabled={isDisabled}
			>
				{children}
			</button>
		</li>
	)
}
