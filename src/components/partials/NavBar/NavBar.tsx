import cn from 'classnames'
import { SignInOut } from 'partials/SignInOut'
import { NavBarProps } from './NavBar.types'

export const NavBar = ({ className, title, hideTitle, hideAuth }: NavBarProps) => {
	return (
		<div className={cn('navbar bg-white shadow-xl px-4', className)} data-testid='NavBar'>
			<div className='navbar-start '>
				<img className='h-12' src='/images/NBDC_logo_full.svg' alt='NBDC Logo' />
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