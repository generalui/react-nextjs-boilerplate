/**
 * Test file for XmlPreview
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { XmlPreview } from './index'

describe('XmlPreview Component', () => {
	it('renders on the page', () => {
		render(<XmlPreview />)

		const component = screen.getByTestId('XmlPreview')

		expect(component).toBeInTheDocument()
	})
})
