/**
 * This is a test file for AlertError
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { AlertError } from './index'

describe('AlertError Component', () => {
	it('renders on the page', () => {
		render(<AlertError />)

		const component = screen.getByTestId('AlertError')

		expect(component).toBeInTheDocument()
	})
})
