/**
 * This is a test file for Header
 */
import { render, screen } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Header } from './index'

describe('Header Component', () => {
	it('renders on the page', () => {
		render(
			<SessionProvider session={null}>
				<Header />
			</SessionProvider>
		)

		const component = screen.getByTestId('Header')

		expect(component).toBeInTheDocument()
	})
})
