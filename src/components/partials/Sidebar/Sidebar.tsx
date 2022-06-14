import {
	ArrowSmRightIcon,
	DocumentReportIcon,
	InboxIcon,
	ShoppingBagIcon,
	TableIcon,
	UserIcon,
	ViewBoardsIcon
} from '@heroicons/react/solid'
import cn from 'classnames'
import { Sidebar as SB } from 'flowbite-react'
import { SidebarProps } from './Sidebar.types'

export const Sidebar = ({ children, className, testId = 'Sidebar' }: SidebarProps) => {
	return (
		<div className={cn('w-48 fixed left-0 bg-white z-10 sidebar', className)} data-testid={testId}>
			<ul>
				<li>
					<DocumentReportIcon className='w-5 h-5 inline' /> Studies
				</li>
			</ul>
		</div>
	)
}
