import Head from 'next/head'
import { NavBar } from 'partials/NavBar'
import { Container } from 'common/Container'
import { PageWrapperProps } from './PageWrapper.types'

export const PageWrapper = ({
	children,
	title,
	hideTitle,
	hideAuth,
	fullWidth
}: PageWrapperProps) => {
	return (
		<div data-testid='PageWrapper'>
			<Head>
				{title && <title>{title}</title>}
				{/* TODO: Handle common meta data here */}
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>

			<NavBar className='mb-16' title={title} hideTitle={hideTitle} hideAuth={hideAuth} />

			{!fullWidth && <Container>{children}</Container>}
			{fullWidth && { children }}
		</div>
	)
}
