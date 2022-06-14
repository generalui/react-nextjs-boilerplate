/**
 * Test file for Studies
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Studies } from './index'

describe('Studies Component', () => {
	it('renders on the page', () => {
		render(<Studies />)

		const component = screen.getByTestId('Studies')

		expect(component).toBeInTheDocument()
	})
})
