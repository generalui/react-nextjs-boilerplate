/**
 * This is a test file for PageWrapper
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/all'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { PageWrapper } from './index'

describe('PageWrapper Component', () => {
	it('renders on the page', () => {
		render(
			<SessionProvider session={null}>
				<PageWrapper />
			</SessionProvider>
		)
		const component = screen.getByTestId('PageWrapper')

		expect(component).toBeInTheDocument()
	})
})
