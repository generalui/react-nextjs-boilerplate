/**
 * This is a test file for Alert
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Alert } from './index'

describe('Alert Component', () => {
	it('renders on the page', () => {
		render(<Alert />)

		const component = screen.getByTestId('Alert')

		expect(component).toBeInTheDocument()
	})
})
