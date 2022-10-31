/**
 * Test file for ConditionsHeaderRow
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { ConditionsHeaderRow } from './index'

describe('ConditionsHeaderRow Component', () => {
	it('renders on the page', () => {
		render(<ConditionsHeaderRow />)

		const component = screen.getByTestId('ConditionsHeaderRow')

		expect(component).toBeInTheDocument()
	})
})
