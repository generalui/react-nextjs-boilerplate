/**
 * Test file for ConditionText
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { ConditionText } from './index'

describe('ConditionText Component', () => {
	it('renders on the page', () => {
		render(<ConditionText />)

		const component = screen.getByTestId('ConditionText')

		expect(component).toBeInTheDocument()
	})
})
