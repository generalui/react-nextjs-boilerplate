/**
 * Test file for QueryBuilder
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { QueryBuilder } from './index'

describe('QueryBuilder Component', () => {
	it('renders on the page', () => {
		render(
			<QueryBuilder
				onFilterChange={jest.fn()}
				dataSummaryCards={[]}
				title={'Participants'}
				fields={[]}
				columns={[]}
			/>
		)

		const component = screen.getByTestId('QueryBuilder')

		expect(component).toBeInTheDocument()
	})
})
