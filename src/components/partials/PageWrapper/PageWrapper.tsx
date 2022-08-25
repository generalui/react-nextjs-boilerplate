import cn from 'classnames'
import Head from 'next/head'
import { useState } from 'react'
import { NavBar } from 'partials/NavBar'
import { Sidebar } from 'partials/Sidebar'
import { Container } from 'common/Container'
import styles from './PageWrapper.module.scss'
import { PageWrapperProps } from './PageWrapper.types'

export const PageWrapper = ({
	children,
	title,
	hideTitle,
	hideAuth,
	hideSidebar,
	fullWidth,
	withSpace = true,
	testId = 'PageWrapper',
	className
}: PageWrapperProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const closeMenu = () => {
		setIsMenuOpen(false)
	}

	return (
		<div data-testid={testId} className='font-inter'>
			<Head>{title && <title>{title}</title>}</Head>

			<NavBar
				title={title}
				hideTitle={hideTitle}
				hideAuth={hideAuth}
				handleMenuToggle={handleMenuToggle}
				isMenuOpen={isMenuOpen}
			/>

			{!hideSidebar && (
				<>
					{isMenuOpen && (
						<Sidebar sidebarLinkOnClick={closeMenu} className='block lg:hidden shadow-2xl' />
					)}
					<Sidebar className='hidden lg:block' />
				</>
			)}
			<div className={cn(hideSidebar ? 'w-full' : styles.withSideBar, styles.withNavBar)}>
				{!fullWidth && (
					<Container
						className={cn(
							'md:mt-12 max-w-screen-lg mb-40',
							withSpace && 'flex flex-col space-y-12',
							className
						)}
					>
						{children}
					</Container>
				)}
				{fullWidth && { children }}
			</div>
		</div>
	)
}
