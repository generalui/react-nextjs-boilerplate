/**
 * Test file for EditConsent
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { EditConsent } from './index'

describe('EditConsent Component', () => {
	it('renders on the page', () => {
		render(<EditConsent />)

		const component = screen.getByTestId('EditConsent')

		expect(component).toBeInTheDocument()
	})
})
