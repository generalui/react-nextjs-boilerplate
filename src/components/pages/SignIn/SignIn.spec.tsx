/**
 * This is a test file for SignIn
 */
import { render, screen } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import { ClientSafeProvider } from 'next-auth/react'
import { RouterContext } from 'next-server/dist/lib/router-context'
import * as nextRouter from 'next/router'
import React from 'react'
import { SignIn } from './index'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const MOCK_PROVIDER: ClientSafeProvider = {
	id: '1',
	name: 'Credentials',
	type: 'credentials',
	signinUrl: '/auth/signin',
	callbackUrl: 'https://localhost:3000/'
}

describe('SignIn Component', () => {
	// jest.mock('next/router', () => ({
	// 	useRouter() {
	// 		return {
	// 			route: '/',
	// 			pathname: '',
	// 			query: {},
	// 			asPath: ''
	// 		}
	// 	}
	// }))
	useRouter.mockImplementationOnce(() => ({
		query: { product: 'coffee' }
	}))
	it('renders on the page', () => {
		render(
			<SessionProvider session={null}>
				{/* disable next line */}
				<SignIn providers={{ credentials: MOCK_PROVIDER }} csrfToken={''} />
			</SessionProvider>
		)

		const component = screen.getByTestId('SignIn')

		expect(component).toBeInTheDocument()
	})
})
