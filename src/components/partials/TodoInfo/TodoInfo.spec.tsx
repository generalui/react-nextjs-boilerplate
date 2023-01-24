/**
 * Test file for TodoInfo
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { TodoInfo } from './index'

describe('TodoInfo Component', () => {
	it('renders on the page', () => {
		render(<TodoInfo isAdmin={false} singleTodoId='1' loading={true} todo={undefined} />)

		const component = screen.getByTestId('TodoInfo')

		expect(component).toBeInTheDocument()
	})
})
