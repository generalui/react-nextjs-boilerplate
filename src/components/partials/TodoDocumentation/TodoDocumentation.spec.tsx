/**
 * Test file for TodoDocumentation
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { TodoDocumentation } from './index'

describe('TodoDocumentation Component', () => {
	it('renders on the page', () => {
		render(<TodoDocumentation singleTodoId='1' loading={false} todo={undefined} />)

		const component = screen.getByTestId('TodoDocumentation')

		expect(component).toBeInTheDocument()
	})
})
