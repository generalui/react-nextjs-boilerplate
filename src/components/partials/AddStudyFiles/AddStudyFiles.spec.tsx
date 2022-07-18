/**
 * Test file for AddStudyFiles
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { AddStudyFiles } from './index'

describe('AddStudyFiles Component', () => {
	it('renders on the page', () => {
		render(<AddStudyFiles />)

		const component = screen.getByTestId('AddStudyFiles')

		expect(component).toBeInTheDocument()
	})
})
