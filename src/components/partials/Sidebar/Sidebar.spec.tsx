/**
 * Test file for Sidebar
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Sidebar } from './index'

describe('Sidebar Component', () => {
	it('renders on the page', () => {
		render(<Sidebar />)

		const component = screen.getByTestId('Sidebar')

		expect(component).toBeInTheDocument()
	})
})
