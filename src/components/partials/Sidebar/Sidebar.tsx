import cn from 'classnames'
import { useRouter } from 'next/router'
import { routeMap } from 'utils/navigation'
import { useText } from 'hooks/useText'
import { SidebarLink } from 'partials/Sidebar/SidebarLink'
import styles from './Sidebar.module.scss'
import { SidebarProps } from './Sidebar.types'

/**
 * Side bar top and height are derived from the height of the NavBar
 */
export const Sidebar = ({ testId = 'Sidebar' }: SidebarProps) => {
	const { t } = useText()
	const router = useRouter()
	const selectedRoute = '/' + router.route.split('/')[1]
	const links = Object.values(routeMap).map(({ labelKey, href, ...rest }) => (
		<SidebarLink href={href} isSelected={href === selectedRoute} key={labelKey} {...rest}>
			{t(labelKey)}
		</SidebarLink>
	))
	links.splice(2, 0, <div className='border-t' key='filler' />)

	return (
		<div
			className={cn('hidden lg:block fixed left-0 bg-white z-10 h-full', styles.sideBar)}
			data-testid={testId}
		>
			<ul className='px-2 sm:px-4 py-6 flex flex-col gap-6'>{links}</ul>
		</div>
	)
}
