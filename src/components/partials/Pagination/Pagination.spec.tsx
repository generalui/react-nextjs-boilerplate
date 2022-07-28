/**
 * Test file for Pagination
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Pagination } from './index'

describe('Pagination Component', () => {
	it('renders on the page', () => {
		render(<Pagination />)

		const component = screen.getByTestId('Pagination')

		expect(component).toBeInTheDocument()
	})
})
