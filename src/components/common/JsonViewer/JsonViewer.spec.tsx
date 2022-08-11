/**
 * Test file for JsonViewer
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { JsonViewer } from './index'

describe('JsonViewer Component', () => {
	it('renders on the page', () => {
		render(<JsonViewer />)

		const component = screen.getByTestId('JsonViewer')

		expect(component).toBeInTheDocument()
	})
})
