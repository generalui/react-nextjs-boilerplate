/**
 * Test file for Condition
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Condition } from './index'

describe('Condition Component', () => {
	it('renders on the page', () => {
		render(<Condition />)

		const component = screen.getByTestId('Condition')

		expect(component).toBeInTheDocument()
	})
})
