/**
 * Test file for Dropzone
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Dropzone } from './index'

describe('Dropzone Component', () => {
	it('renders on the page', () => {
		render(<Dropzone />)

		const component = screen.getByTestId('Dropzone')

		expect(component).toBeInTheDocument()
	})
})
