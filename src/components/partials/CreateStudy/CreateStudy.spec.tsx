/**
 * Test file for CreateStudy
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/all'
import React from 'react'
import { CreateStudy } from './index'

describe('CreateStudy Component', () => {
	it('renders on the page', () => {
		render(<CreateStudy />)

		const component = screen.getByTestId('CreateStudy')

		expect(component).toBeInTheDocument()
	})
})
