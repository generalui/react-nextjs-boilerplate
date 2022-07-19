/**
 * Test file for DocumentationList
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { DocumentationList } from './index'

describe('DocumentationList Component', () => {
	it('renders on the page', () => {
		render(<DocumentationList documents={[]} />)

		const component = screen.getByTestId('DocumentationList')

		expect(component).toBeInTheDocument()
	})
})
