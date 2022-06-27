/**
 * Test file for Breadcrumbs
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Breadcrumbs } from './index'

describe('Breadcrumbs Component', () => {
	it('renders on the page', () => {
		render(<Breadcrumbs />)

		const component = screen.getByTestId('Breadcrumbs')

		expect(component).toBeInTheDocument()
	})
})
