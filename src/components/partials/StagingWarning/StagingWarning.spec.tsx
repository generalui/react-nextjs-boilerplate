/**
 * Test file for StagingWarning
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { StagingWarning } from './index'

describe('StagingWarning Component', () => {
	it('renders on the page', () => {
		render(<StagingWarning />)

		const component = screen.getByTestId('StagingWarning')

		expect(component).toBeInTheDocument()
	})
})
