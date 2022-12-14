/**
 * Test file for ExportData
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { ExportData } from './index'

describe('ExportData Component', () => {
	it('renders on the page', () => {
		render(<ExportData />)

		const component = screen.getByTestId('ExportData')

		expect(component).toBeInTheDocument()
	})
})
