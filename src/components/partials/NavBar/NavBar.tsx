import cn from 'classnames'
import { useText } from 'hooks/useText'
import { SignInOut } from 'partials/SignInOut'
import styles from './NavBar.module.css'
import { NavBarProps } from './NavBar.types'

/**
 * Side bar top and height are derived from the height of the NavBar
 */

export const NavBar = ({ hideAuth, testId = 'NavBar' }: NavBarProps) => {
	const { t } = useText('common.client')

	return (
		<div
			className={cn(
				'w-full border-b py-1 flex justify-center items-center border-gray-200 bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4',
				styles.navBar
			)}
			data-testid={testId}
		>
			<div className='grid grid-cols-2 w-full items-center'>
				<div>
					<img className='h-12' src='/images/NBDC_logo_full.svg' alt={t('logoAlt')} />
				</div>

				<div>
					{hideAuth ? (
						' '
					) : (
						<div className='flex justify-end items-center'>
							<SignInOut />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
