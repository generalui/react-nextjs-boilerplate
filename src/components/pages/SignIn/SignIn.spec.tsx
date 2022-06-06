/**
 * This is a test file for SignIn
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/all'
import { SessionProvider } from 'next-auth/react'
import { ClientSafeProvider } from 'next-auth/react'
import React from 'react'
import { SignIn } from './index'

const MOCK_PROVIDER: ClientSafeProvider = {
	id: '1',
	name: 'Credentials',
	type: 'credentials',
	signinUrl: '/auth/signin',
	callbackUrl: 'https://localhost:3000/'
}

describe('SignIn Component', () => {
	// useRouterMock()

	it('renders on the page', () => {
		render(
			<SessionProvider session={null}>
				<SignIn providers={{ credentials: MOCK_PROVIDER }} csrfToken={''} />
			</SessionProvider>
		)

		const component = screen.getByTestId('SignIn')

		expect(component).toBeInTheDocument()
	})
})
