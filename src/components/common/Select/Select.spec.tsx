/**
 * Test file for Select
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Select } from './index'

describe('Select Component', () => {
	it('renders on the page', () => {
		render(<Select />)

		const component = screen.getByTestId('Select')

		expect(component).toBeInTheDocument()
	})
})
