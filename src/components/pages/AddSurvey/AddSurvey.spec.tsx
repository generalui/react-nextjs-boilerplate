/**
 * Test file for AddSurvey
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { AddSurvey } from './index'

describe('AddSurvey Component', () => {
	it('renders on the page', () => {
		render(<AddSurvey />)

		const component = screen.getByTestId('AddSurvey')

		expect(component).toBeInTheDocument()
	})
})
