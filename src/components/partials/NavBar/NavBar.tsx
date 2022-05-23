import { FC } from 'react'
import { Button } from 'common/Button'
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
				<Button className='btn-sm'>Sign In</Button>
			</div>
		</div>
	)
}
