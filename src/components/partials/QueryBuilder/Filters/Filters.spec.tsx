/**
 * Test file for Filters
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Filters } from './index'

describe('Filters Component', () => {
	it('renders on the page', () => {
		render(<Filters />)

		const component = screen.getByTestId('Filters')

		expect(component).toBeInTheDocument()
	})
})
