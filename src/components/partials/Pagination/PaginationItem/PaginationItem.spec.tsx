/**
 * Test file for PaginationItem
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { PaginationItem } from './index'

describe('PaginationItem Component', () => {
	it('renders on the page', () => {
		render(<PaginationItem />)

		const component = screen.getByTestId('PaginationItem')

		expect(component).toBeInTheDocument()
	})
})
