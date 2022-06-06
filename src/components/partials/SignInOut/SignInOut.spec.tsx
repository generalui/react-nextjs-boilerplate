/**
 * This is a test file for SignInOut
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/all'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { SignInOut } from './index'

describe('SignInOut Component', () => {
	it('renders on the page', () => {
		render(
			<SessionProvider session={null}>
				<SignInOut />
			</SessionProvider>
		)

		const component = screen.getByTestId('SignInOut')

		expect(component).toBeInTheDocument()
	})
})
