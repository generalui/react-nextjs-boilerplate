/**
 * Test file for CreateStudy
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { CreateStudy } from './index'

describe('CreateStudy Component', () => {
	it('renders on the page', () => {
		render(<CreateStudy />)

		const component = screen.getByTestId('CreateStudy')

		expect(component).toBeInTheDocument()
	})
})
