/**
 * Test file for Test
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Test } from './index'

describe('Test Component', () => {
	it('renders on the page', () => {
		render(<Test />)

		const component = screen.getByTestId('Test')

		expect(component).toBeInTheDocument()
	})
})
