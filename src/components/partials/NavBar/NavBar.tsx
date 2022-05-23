import { FC } from 'react'
import { NavBarProps } from './NavBar.types'

export const NavBar: FC<NavBarProps> = () => {
	return (
		<div className='navbar bg-white' data-testid='NavBar'>
			<div className='navbar-start '>
				<div className='w-40'>
					<img src='/images/NBDC_logo_full.svg' alt='NBDC Logo' />
				</div>
			</div>
			<div className='navbar-center hidden lg:flex'>Home</div>
			<div className='navbar-end'>
				<button className='btn btn-sm'>Sign In</button>
			</div>
		</div>
	)
}
