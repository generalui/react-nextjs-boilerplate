import cn from 'classnames'
import Head from 'next/head'
import { useEffect, useState } from 'react'
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
	testId = 'PageWrapper'
}: PageWrapperProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	console.log('isMenuOpen: ', isMenuOpen)

	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const closeMenu = () => {
		setIsMenuOpen(false)
	}

	return (
		<div data-testid={testId} className='font-inter'>
			<Head>
				{title && <title>{title}</title>}
				{/* TODO: Handle common meta data here */}
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>

			<NavBar title={title} hideTitle={hideTitle} hideAuth={hideAuth} />
			<NavBar
				title={title}
				hideTitle={hideTitle}
				hideAuth={hideAuth}
				handleMenuToggle={handleMenuToggle}
				isMobileView={isMenuOpen}
			/>

			{!hideSidebar && (
				<>
					{isMenuOpen && <Sidebar sidebarLinkOnClick={closeMenu} className='block lg:hidden' />}
					<Sidebar className='hidden lg:block' />
				</>
			)}

			<div className={cn(hideSidebar ? 'w-full' : styles.withSideBar, styles.withNavBar)}>
				{!fullWidth && (
					<Container className='md:mt-[4.5rem] max-w-screen-lg pb-20'>{children}</Container>
				)}
				{fullWidth && { children }}
			</div>
		</div>
	)
}
