import cn from 'classnames'
import { Navbar } from 'flowbite-react'
import { useText } from 'hooks/useText'
import { SignInOut } from 'partials/SignInOut'
import { Col } from 'common/Col'
import { Grid } from 'common/Grid'
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
		<Navbar className={cn('border-gray-200 border-b-2 py-1', className)} data-testid={testId}>
			<Grid cols={3} className='w-full'>
				<Col span={1}>
					<Navbar.Brand href='/'>
						<img className='h-12' src='/images/NBDC_logo_full.svg' alt={t('logoAlt')} />
					</Navbar.Brand>
				</Col>
				<Col span={1} className='flex justify-center items-center'>
					{!hideTitle && title && <div className='navbar-center hidden lg:flex'>{title}</div>}
				</Col>
				<Col span={1} start={3} className='flex justify-end items-center'>
					{hideAuth ? ' ' : <SignInOut />}
				</Col>
			</Grid>
			{/* <div className='grid grid-cols-3 px-4 py-2 w-full'>
				<div>
					<Navbar.Brand href='/'>
						<img className='h-12' src='/images/NBDC_logo_full.svg' alt={t('logoAlt')} />
					</Navbar.Brand>
				</div>
				<div className='flex justify-center items-center'>
					{!hideTitle && title && <div className='navbar-center hidden lg:flex'>{title}</div>}
				</div>
				<div>{hideAuth ? ' ' : <SignInOut />}</div>
			</div> */}
		</Navbar>
	)
}
