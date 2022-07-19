/**
 * Test file for List
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { List } from './index'

describe('List Component', () => {
	it('renders on the page', () => {
		render(<List columns={[]} data={[]} />)

		const component = screen.getByTestId('List')

		expect(component).toBeInTheDocument()
	})
})
