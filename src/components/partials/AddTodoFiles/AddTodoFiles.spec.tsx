/**
 * Test file for AddTodoFiles
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { AddTodoFiles } from './index'

describe('AddTodoFiles Component', () => {
	it('renders on the page', () => {
		render(<AddTodoFiles todoId={''} />)

		const component = screen.getByTestId('AddTodoFiles')

		expect(component).toBeInTheDocument()
	})
})
