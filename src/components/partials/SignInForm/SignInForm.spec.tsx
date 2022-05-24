/**
 * This is a test file for SignInForm
 */
import { render, screen } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { SignInForm } from './index'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('SignInForm Component', () => {
	it('renders on the page', () => {
		useRouter.mockImplementationOnce(() => ({
			query: { product: 'coffee' }
		}))

		render(
			<SessionProvider session={null}>
				<SignInForm providers={{}} csrfToken='' />
			</SessionProvider>
		)

		const component = screen.getByTestId('SignInForm')

		expect(component).toBeInTheDocument()
	})
})
