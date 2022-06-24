/**
 * Test file for StudyDetails
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { StudyDetails } from './index'

describe('StudyDetails Component', () => {
	it('renders on the page', () => {
		render(<StudyDetails />)

		const component = screen.getByTestId('StudyDetails')

		expect(component).toBeInTheDocument()
	})
})
