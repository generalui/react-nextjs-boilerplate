import cn from 'classnames'
import { useRouter } from 'next/router'
import { useText } from 'hooks/useText'
import { SidebarLink } from 'partials/Sidebar/SidebarLink'
import styles from './Sidebar.module.scss'
import { SidebarProps, SidebarRoute } from './Sidebar.types'

const routes: SidebarRoute[] = [
	{
		href: '/',
		icon: 'HomeIcon',
		labelKey: 'nav.home'
	},
	{
		href: '/studies',
		icon: 'DocumentReportIcon',
		labelKey: 'nav.studies'
	},
	{
		className: 'border-t',
		href: '/profile',
		icon: 'CogIcon',
		labelKey: 'nav.settings'
	}
]

/**
 * Side bar top and height are derived from the height of the NavBar
 */
export const Sidebar = ({ testId = 'Sidebar' }: SidebarProps) => {
	const { t } = useText('common.sidebar')
	const router = useRouter()
	const selectedRoute = '/' + router.route.split('/')[1]

	return (
		<div
			className={cn('hidden lg:block fixed left-0 bg-white z-10 h-full', styles.sideBar)}
			data-testid={testId}
		>
			<div className='px-2 sm:px-4 py-2.5 '>
				<ul>
					{routes.map(({ labelKey, href, ...rest }) => (
						<SidebarLink href={href} isSelected={href === selectedRoute} key={labelKey} {...rest}>
							{t(labelKey)}
						</SidebarLink>
					))}
				</ul>
			</div>
		</div>
	)
}
