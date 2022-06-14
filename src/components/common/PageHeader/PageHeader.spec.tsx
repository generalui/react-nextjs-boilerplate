/**
 * Test file for PageHeader
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { PageHeader } from './index'

describe('PageHeader Component', () => {
	it('renders on the page', () => {
		render(<PageHeader />)

		const component = screen.getByTestId('PageHeader')

		expect(component).toBeInTheDocument()
	})
})
