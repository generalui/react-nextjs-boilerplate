/**
 * Test file for StagingWarning
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { StagingWarning } from './index'

describe('StagingWarning Component', () => {
	it('renders on the page', () => {
		render(<StagingWarning />)

		let component
		try {
			component = screen.getByTestId('StagingWarning')
		} catch (error) {
			if (
				error ===
				'Error [TestingLibraryElementError]: Unable to find an element by: [data-testid="StagingWarning"]'
			)
				expect(component).toBeUndefined()
		} finally {
			if (process.env.NEXT_PUBLIC_ENV && process.env.NEXT_PUBLIC_ENV === 'staging')
				expect(component).toBeInTheDocument()
		}
	})
})
