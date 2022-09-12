/**
 * Test file for ToggleButton
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ToggleButton } from './index'

describe('ToggleButton Component', () => {
	it('renders on the page', () => {
		render(<ToggleButton />)

		const component = screen.getByTestId('ToggleButton')

		expect(component).toBeInTheDocument()
	})
})
