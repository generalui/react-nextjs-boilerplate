/**
 * Test file for TodoConsent
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { TodoConsent } from './index'

describe('TodoConsent Component', () => {
	it('renders on the page', () => {
		render(<TodoConsent />)

		const component = screen.getByTestId('TodoConsent')

		expect(component).toBeInTheDocument()
	})
})
