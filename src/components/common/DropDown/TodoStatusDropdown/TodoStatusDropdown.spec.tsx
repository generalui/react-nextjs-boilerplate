/**
 * Test file for TodoStatusDropdown
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { TodoStatusDropdown } from './index'

describe('TodoStatusDropdown Component', () => {
	it('renders on the page', () => {
		render(<TodoStatusDropdown onChange={jest.fn()} value={'new'} />)

		const component = screen.getByTestId('TodoStatusDropdown')

		expect(component).toBeInTheDocument()
	})
})
