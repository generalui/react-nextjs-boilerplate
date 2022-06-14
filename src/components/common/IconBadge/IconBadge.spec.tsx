/**
 * Test file for IconBadge
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { IconBadge } from './index'

describe('IconBadge Component', () => {
	it('renders on the page', () => {
		render(<IconBadge />)

		const component = screen.getByTestId('IconBadge')

		expect(component).toBeInTheDocument()
	})
})
