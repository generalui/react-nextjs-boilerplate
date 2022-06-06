/**
 * This is a test file for SignInForm
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/useRouter'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { SignInForm } from './index'

describe('SignInForm Component', () => {
	it('renders on the page', () => {
		render(
			<SessionProvider session={null}>
				<SignInForm providers={{}} csrfToken='' />
			</SessionProvider>
		)

		const component = screen.getByTestId('SignInForm')

		expect(component).toBeInTheDocument()
	})
})
