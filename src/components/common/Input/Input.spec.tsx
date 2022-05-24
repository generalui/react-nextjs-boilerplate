/**
 * This is a test file for Input
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Input } from './index'

describe('Input Component', () => {
	it('renders on the page', () => {
		render(<Input data-testid={'Input'} />)

		const component = screen.getByTestId('Input')

		expect(component).toBeInTheDocument()
	})
})
