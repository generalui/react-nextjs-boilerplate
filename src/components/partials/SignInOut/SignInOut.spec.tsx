/**
 * This is a test file for SignInOut
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { SignInOut } from './index'

describe('SignInOut Component', () => {
	it('renders on the page', () => {
		render(<SignInOut />)

		const component = screen.getByTestId('SignInOut')

		expect(component).toBeInTheDocument()
	})
})
