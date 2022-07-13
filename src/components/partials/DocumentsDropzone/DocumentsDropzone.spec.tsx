/**
 * Test file for DocumentsDropzone
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { DocumentsDropzone } from './index'

describe('DocumentsDropzone Component', () => {
	it('renders on the page', () => {
		render(<DocumentsDropzone />)

		const component = screen.getByTestId('DocumentsDropzone')

		expect(component).toBeInTheDocument()
	})
})
