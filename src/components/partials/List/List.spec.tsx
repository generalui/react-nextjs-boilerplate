/**
 * Test file for List
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { List } from './index'

describe('List Component', () => {
	it('renders on the page', () => {
		render(<List />)

		const component = screen.getByTestId('List')

		expect(component).toBeInTheDocument()
	})
})
