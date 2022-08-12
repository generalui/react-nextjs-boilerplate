/**
 * Test file for BreadcrumbLink
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BreadcrumbLink } from './index'

describe('BreadcrumbLink Component', () => {
	it('renders on the page', () => {
		render(<BreadcrumbLink href={'/'} label='test' />)

		const component = screen.getByTestId('BreadcrumbLink')

		expect(component).toBeInTheDocument()
	})
})
