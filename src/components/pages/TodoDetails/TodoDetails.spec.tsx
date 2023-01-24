/**
 * Test file for TodoDetails
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { TodoDetails } from './index'

describe('TodoDetails Component', () => {
	it('renders on the page', () => {
		render(<TodoDetails />)

		const component = screen.getByTestId('TodoDetails')

		expect(component).toBeInTheDocument()
	})
})
