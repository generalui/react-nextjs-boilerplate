/**
 * Test file for Spinner
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Spinner } from './index'

describe('Spinner Component', () => {
	it('renders on the page', () => {
		render(<Spinner />)

		const component = screen.getByTestId('Spinner')

		expect(component).toBeInTheDocument()
	})
})
