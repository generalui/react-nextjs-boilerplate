/**
 * This is a test file for Container
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Container } from './index'

describe('Container Component', () => {
	it('renders on the page', () => {
		render(<Container />)

		const component = screen.getByTestId('Container')

		expect(component).toBeInTheDocument()
	})
})
