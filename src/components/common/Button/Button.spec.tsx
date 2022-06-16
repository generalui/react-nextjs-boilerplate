/**
 * This is a test file for Button
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Button } from './index'

describe('Button Component', () => {
	it('renders on the page', () => {
		render(<Button />)

		const component = screen.getByTestId('Button')

		expect(component).toBeInTheDocument()
	})
})
