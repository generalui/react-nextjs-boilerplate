/**
 * Test file for SubmitButton
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { SubmitButton } from './index'

describe('SubmitButton Component', () => {
	it('renders on the page', () => {
		render(<SubmitButton />)

		const component = screen.getByTestId('SubmitButton')

		expect(component).toBeInTheDocument()
	})
})
