/**
 * Test file for Icon
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Icon } from './index'

describe('Icon Component', () => {
	it('renders on the page', () => {
		render(<Icon />)

		const component = screen.getByTestId('Icon')

		expect(component).toBeInTheDocument()
	})
})
