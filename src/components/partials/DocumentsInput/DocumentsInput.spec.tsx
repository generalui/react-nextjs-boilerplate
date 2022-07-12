/**
 * Test file for DocumentsInput
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { DocumentsInput } from './index'

describe('DocumentsInput Component', () => {
	it('renders on the page', () => {
		render(<DocumentsInput />)

		const component = screen.getByTestId('DocumentsInput')

		expect(component).toBeInTheDocument()
	})
})
