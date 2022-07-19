/**
 * Test file for AddStudyFiles
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { AddStudyFiles } from './index'

describe('AddStudyFiles Component', () => {
	it('renders on the page', () => {
		render(<AddStudyFiles studyId={''} />)

		const component = screen.getByTestId('AddStudyFiles')

		expect(component).toBeInTheDocument()
	})
})
