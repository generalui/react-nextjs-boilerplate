import cn from 'classnames'
import Link from 'next/link'
import { PaginationItemProps } from './PaginationItem.types'

export const PaginationItem = ({
	children,
	className,
	testId = 'PaginationItem',
	href = '#',
	onClick
}: PaginationItemProps) => {
	return (
		<li>
			<Link href={href} passHref>
				<a
					onClick={onClick}
					href='#'
					data-testid={testId}
					className={cn(
						'py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
						className
					)}
				>
					{children}
				</a>
			</Link>
		</li>
	)
}
