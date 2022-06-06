/**
 * This is a test file for SignInForm
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/all'
import React from 'react'
import { SignInForm } from './index'

describe('SignInForm Component', () => {
	it('renders on the page', () => {
		render(<SignInForm providers={{}} csrfToken='' />)

		const component = screen.getByTestId('SignInForm')

		expect(component).toBeInTheDocument()
	})
})
