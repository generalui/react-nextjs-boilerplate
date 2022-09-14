/**
 * Test file for QueryBuilder
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { QueryBuilder } from './index'

describe('QueryBuilder Component', () => {
	it('renders on the page', () => {
		render(<QueryBuilder />)

		const component = screen.getByTestId('QueryBuilder')

		expect(component).toBeInTheDocument()
	})
})
