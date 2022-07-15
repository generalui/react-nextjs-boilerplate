import cn from 'classnames'
import { headerLogo } from 'client.config'
import Link from 'next/link'
import { useText } from 'hooks/useText'
import { ProfileDropDown } from 'partials/ProfileDropDown'
import { Icon } from 'common/Icon'
import styles from './NavBar.module.scss'
import { NavBarProps } from './NavBar.types'

/**
 * Side bar top and height are derived from the height of the NavBar
 */

export const NavBar = ({
	hideAuth,
	isMenuOpen,
	handleMenuToggle,
	testId = 'NavBar'
}: NavBarProps) => {
	const { t } = useText('common.client')

	return (
		<div
			className={cn(
				'w-full border-b py-1 flex justify-center items-center border-gray-200 bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 z-10 fixed top-0 right-0 left-0',
				styles.navBar
			)}
			data-testid={testId}
		>
			<div className='flex justify-between w-full items-center'>
				<div className='flex items-center'>
					{hideAuth ? (
						<img className='h-12' src={headerLogo} alt={t('logoAlt')} />
					) : (
						<>
							<button className='block lg:hidden h-8 w-8 cursor-pointer' onClick={handleMenuToggle}>
								<Icon icon={isMenuOpen ? 'XIcon' : 'MenuIcon'} />
							</button>
							<Link href='/' passHref>
								<a>
									<img className='h-12 cursor-pointer' src={headerLogo} alt={t('logoAlt')} />
								</a>
							</Link>
						</>
					)}
				</div>

				<div>
					{hideAuth ? (
						' '
					) : (
						<div className='flex justify-end items-center'>
							<ProfileDropDown />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
