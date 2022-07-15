/**
 * Test file for StudyDocumentation
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { StudyDocumentation } from './index'

describe('StudyDocumentation Component', () => {
	it('renders on the page', () => {
		render(<StudyDocumentation />)

		const component = screen.getByTestId('StudyDocumentation')

		expect(component).toBeInTheDocument()
	})
})
