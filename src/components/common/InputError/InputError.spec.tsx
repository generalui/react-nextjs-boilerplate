/**
 * Test file for InputError
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { InputError } from './index'

describe('InputError Component', () => {
	it('renders on the page', () => {
		render(<InputError />)

		const component = screen.getByTestId('InputError')

		expect(component).toBeInTheDocument()
	})
})
