/**
 * Test file for CreateTodo
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { CreateTodo } from './index'

describe('CreateTodo Component', () => {
	it('renders on the page', () => {
		render(<CreateTodo />)

		const component = screen.getByTestId('CreateTodo')

		expect(component).toBeInTheDocument()
	})
})
