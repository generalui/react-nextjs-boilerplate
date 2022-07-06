import cn from 'classnames'
import Link from 'next/link'
import { Icon } from 'common/Icon'
import { Text } from 'common/Text'
import { SidebarLinkProps } from './SidebarLink.types'

export const SidebarLink = ({
	children,
	className,
	href,
	icon,
	isSelected,
	testId = 'SidebarLink'
}: SidebarLinkProps) => (
	<li className={cn(className)} data-testid={testId}>
		<Link href={href} passHref>
			<Text
				className={cn(
					isSelected ? 'text-blue-600 bg-gray-100' : 'text-gray-900',
					'w-full flex items-center py-1 px-2 gap-4 rounded-lg text-base font-bold dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
				)}
			>
				<Icon icon={icon} size='md' />
				{children}
			</Text>
		</Link>
	</li>
)
