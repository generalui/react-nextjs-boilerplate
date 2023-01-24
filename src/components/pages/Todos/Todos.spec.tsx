/**
 * Test file for Todos
 */
// import { render } from '__tests__/utils'
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Todos } from './index'

describe('Todos Component', () => {
	it('renders on the page', () => {
		render(<Todos />)

		// TODO: Fix test
		const component = screen.getByTestId('Todos')
		expect(component).toBeInTheDocument()
	})
})
