import { useText } from 'hooks/useText'
import { SignInOut } from 'partials/SignInOut'
import { NavBarProps } from './NavBar.types'

/**
 * Side bar top and height are derived from the height of the NavBar
 */

export const NavBar = ({ title, hideTitle, hideAuth, testId = 'NavBar' }: NavBarProps) => {
	const { t } = useText('common.client')

	return (
		<div
			className={`w-full border-b-[1px] py-1 h-[4.25rem] flex justify-center items-center border-gray-200 bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4`}
			data-testid={testId}
		>
			<div className='grid grid-cols-3 w-full items-center'>
				<div>
					<img className='h-12' src='/images/NBDC_logo_full.svg' alt={t('logoAlt')} />
				</div>
				<div>
					{!hideTitle && title && (
						<div className='hidden lg:flex justify-center items-center'>{title}</div>
					)}
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
