/**
 * Test file for EditConsent
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { EditConsent } from './index'

describe('EditConsent Component', () => {
	it('renders on the page', () => {
		render(<EditConsent modalName='test' />)

		const component = screen.getByTestId('EditConsent')

		expect(component).toBeInTheDocument()
	})
})
