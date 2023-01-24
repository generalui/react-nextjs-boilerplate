/**
 * Test file for EditTodo
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { EditTodo } from './index'

describe('EditTodo Component', () => {
	it('renders on the page', () => {
		render(<EditTodo todoId={''} />)

		const component = screen.getByTestId('EditTodo')

		expect(component).toBeInTheDocument()
	})
})
