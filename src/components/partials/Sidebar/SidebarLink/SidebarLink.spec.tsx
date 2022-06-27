/**
 * Test file for SidebarLink
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { SidebarLink } from './index'

describe('SidebarLink Component', () => {
	it('renders on the page', () => {
		render(<SidebarLink href={''} icon={'HomeIcon'} />)

		const component = screen.getByTestId('SidebarLink')

		expect(component).toBeInTheDocument()
	})
})
