/**
 * Test file for QueryBuilder
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { QueryBuilder } from './index'

describe('QueryBuilder Component', () => {
	it('renders on the page', () => {
		render(<QueryBuilder model='participant' summaryModel='study' fields={[]} conditions={[]} />)

		const component = screen.getByTestId('QueryBuilder')

		expect(component).toBeInTheDocument()
	})
})
