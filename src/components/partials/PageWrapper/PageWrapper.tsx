import cn from 'classnames'
import Head from 'next/head'
import { NavBar } from 'partials/NavBar'
import { Sidebar } from 'partials/Sidebar'
import { Container } from 'common/Container'
import styles from './PageWrapper.module.css'
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
	return (
		<div data-testid={testId}>
			<Head>
				{title && <title>{title}</title>}
				{/* TODO: Handle common meta data here */}
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>

			<NavBar title={title} hideTitle={hideTitle} hideAuth={hideAuth} />

			{!hideSidebar && <Sidebar />}

			<div className={cn(hideSidebar ? 'w-full' : styles.withSideBar, styles.withNavBar)}>
				{!fullWidth && (
					<Container className='mt-[4.5rem] max-w-screen-lg pb-20'>{children}</Container>
				)}
				{fullWidth && { children }}
			</div>
		</div>
	)
}
