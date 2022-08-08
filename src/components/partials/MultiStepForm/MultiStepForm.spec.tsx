/**
 * Test file for MultiStepForm
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { MultiStepForm } from './index'

describe('MultiStepForm Component', () => {
	it('renders on the page', () => {
		render(<MultiStepForm components={[]} />)

		const component = screen.getByTestId('MultiStepForm')

		expect(component).toBeInTheDocument()
	})
})
