/**
 * Test file for StatusBadge
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { StatusBadge } from './index'

describe('StatusBadge Component', () => {
	it('renders on the page', () => {
		render(<StatusBadge v={'new'} />)

		const component = screen.getByTestId('StatusBadge')

		expect(component).toBeInTheDocument()
	})
})
