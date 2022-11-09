/**
 * Test file for FiltersHeader
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { FiltersHeader } from './index'

describe('FiltersHeader Component', () => {
	it('renders on the page', () => {
		render(<FiltersHeader />)

		const component = screen.getByTestId('FiltersHeader')

		expect(component).toBeInTheDocument()
	})
})
