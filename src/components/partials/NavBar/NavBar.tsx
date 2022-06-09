import cn from 'classnames'
import { useText } from 'hooks/useText'
import { SignInOut } from 'partials/SignInOut'
import { NavBarProps } from './NavBar.types'

export const NavBar = ({
	className,
	title,
	hideTitle,
	hideAuth,
	testId = 'NavBar'
}: NavBarProps) => {
	const { t } = useText('common.client')

	return (
		<div className={cn('navbar bg-white shadow-xl px-4', className)} data-testid={testId}>
			<div className='navbar-start '>
				<img className='h-12' src='/images/NBDC_logo_full.svg' alt={t('logoAlt')} />
			</div>
			{!hideTitle && title && <div className='navbar-center hidden lg:flex'>{title}</div>}
			{!hideAuth && (
				<div className='navbar-end'>
					<SignInOut />
				</div>
			)}
		</div>
	)
}
