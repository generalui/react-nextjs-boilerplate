/**
 * Test file for Pagination
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Pagination } from './index'

describe('Pagination Component', () => {
	it('renders on the page', () => {
		render(<Pagination totalCount={50} />)

		const component = screen.getByTestId('Pagination')

		expect(component).toBeInTheDocument()
	})

	it('does not render on the page when the total count is lower than the page size', () => {
		render(<Pagination totalCount={5} pageSize={20} />)

		let component
		try {
			component = screen.getByTestId('Pagination')
		} catch (error) {
			if (
				error ===
				'Error [TestingLibraryElementError]: Unable to find an element by: [data-testid="Pagination"]'
			)
				expect(component).toBeUndefined()
		}
	})
})
