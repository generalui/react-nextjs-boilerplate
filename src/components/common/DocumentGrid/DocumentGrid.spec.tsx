/**
 * Test file for DocumentGrid
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { DocumentGrid } from './index'

describe('DocumentGrid Component', () => {
	it('renders on the page', () => {
		render(<DocumentGrid />)

		const component = screen.getByTestId('DocumentGrid')

		expect(component).toBeInTheDocument()
	})
})
