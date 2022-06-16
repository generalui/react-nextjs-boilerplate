/**
 * Test file for Text
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Text } from './index'

describe('Text Component', () => {
	it('renders on the page', () => {
		render(<Text />)

		const component = screen.getByTestId('Text')

		expect(component).toBeInTheDocument()
	})
})
