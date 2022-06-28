/**
 * Test file for EditStudy
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { EditStudy } from './index'

describe('EditStudy Component', () => {
	it('renders on the page', () => {
		render(<EditStudy studyId={''} />)

		const component = screen.getByTestId('EditStudy')

		expect(component).toBeInTheDocument()
	})
})
