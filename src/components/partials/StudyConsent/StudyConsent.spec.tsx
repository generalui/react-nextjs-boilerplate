/**
 * Test file for StudyConsent
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { StudyConsent } from './index'

describe('StudyConsent Component', () => {
	it('renders on the page', () => {
		render(<StudyConsent />)

		const component = screen.getByTestId('StudyConsent')

		expect(component).toBeInTheDocument()
	})
})
