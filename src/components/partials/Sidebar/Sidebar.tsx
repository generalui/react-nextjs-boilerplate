import cn from 'classnames'
import { useRouter } from 'next/router'
import { SyntheticEvent } from 'react'
import { routeMap } from 'utils/client/routeMap'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useText } from 'hooks/useText'
import { SidebarLink } from 'partials/Sidebar/SidebarLink'
import { DropDown } from 'common/DropDown'
import { DropDownItemProps } from 'common/DropDown/DropDownItem/DropDownItem.types'
import { Text } from 'common/Text'
import styles from './Sidebar.module.scss'
import { SidebarProps } from './Sidebar.types'

/**
 * Side bar top and height are derived from the height of the NavBar
 */
export const Sidebar = ({ sidebarLinkOnClick, className, testId = 'Sidebar' }: SidebarProps) => {
	const { t } = useText()
	const { currentUser } = useCurrentUser()
	const router = useRouter()
	const selectedRoute = '/' + router.route.split('/')[1]
	const links = Object.values(routeMap).map(({ labelKey, href, role, dropdownItems, ...rest }) => {
		const isSelected = href === selectedRoute
		let items: DropDownItemProps[] = []
		if (dropdownItems) {
			items = dropdownItems.map((item) => {
				return { ...item, onClick: () => router.push(`${item.href}`) }
			})
		}

		return (
			(role === 'general' || currentUser?.role === role) && (
				<SidebarLink
					onClick={(value: unknown) => {
						const event = value as SyntheticEvent
						if (dropdownItems) event.preventDefault()
						sidebarLinkOnClick?.()
					}}
					href={href}
					isSelected={isSelected}
					key={labelKey}
					{...rest}
				>
					{dropdownItems ? (
						<DropDown items={items} v='sidebar'>
							<Text
								size='base'
								className={cn(
									isSelected ? 'text-primary bg-gray-100 font-bold' : 'text-gray-900 font-bold'
								)}
							>
								{t(labelKey)}
							</Text>
						</DropDown>
					) : (
						t(labelKey)
					)}
				</SidebarLink>
			)
		)
	})

	return (
		<div
			className={cn('block fixed left-0 bg-white z-10 h-full', styles.sideBar, className)}
			data-testid={testId}
		>
			<ul className='px-2 sm:px-4 py-6 flex flex-col gap-6'>{links}</ul>
		</div>
	)
}
