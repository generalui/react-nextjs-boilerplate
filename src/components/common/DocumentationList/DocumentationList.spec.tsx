/**
 * Test file for DocumentationList
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { DocumentationList } from './index'

describe('DocumentationList Component', () => {
	it('renders on the page', () => {
		render(<DocumentationList />)

		const component = screen.getByTestId('DocumentationList')

		expect(component).toBeInTheDocument()
	})
})
