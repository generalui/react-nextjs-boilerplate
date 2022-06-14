/**
 * Test file for Grid
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Grid } from './index'

describe('Grid Component', () => {
	it('renders on the page', () => {
		render(<Grid />)

		const component = screen.getByTestId('Grid')

		expect(component).toBeInTheDocument()
	})
})
