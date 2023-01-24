/**
 * Test file for TodoList
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { TodoList } from './index'

describe('TodoList Component', () => {
	it('renders on the page', () => {
		render(<TodoList todos={[]} />)

		const component = screen.getByTestId('TodoList')

		expect(component).toBeInTheDocument()
	})
})
