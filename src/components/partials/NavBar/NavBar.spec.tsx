/**
 * This is a test file for NavBar
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/all'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { NavBar } from './index'

describe('NavBar Component', () => {
	it('renders on the page', () => {
		render(
			<SessionProvider session={null}>
				<NavBar />
			</SessionProvider>
		)

		const component = screen.getByTestId('NavBar')

		expect(component).toBeInTheDocument()
	})
})
