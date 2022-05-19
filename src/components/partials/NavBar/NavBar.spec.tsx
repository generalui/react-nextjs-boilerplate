/**
 * This is a test file for NavBar
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { NavBar } from './index'

describe('NavBar Component', () => {
	it('renders on the page', () => {
		render(<NavBar />)

		const component = screen.getByTestId('NavBar')

		expect(component).toBeInTheDocument()
	})
})
