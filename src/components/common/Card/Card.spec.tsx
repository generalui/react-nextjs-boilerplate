/**
 * This is a test file for Card
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Card } from './index'

describe('Card Component', () => {
	it('renders on the page', () => {
		render(<Card />)

		const component = screen.getByTestId('Card')

		expect(component).toBeInTheDocument()
	})
})
