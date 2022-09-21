/**
 * Test file for Summary
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Summary } from './index'

describe('Summary Component', () => {
	it('renders on the page', () => {
		render(<Summary model='participant' summaryModel='study' />)

		const component = screen.getByTestId('Summary')

		expect(component).toBeInTheDocument()
	})
})
