/**
 * Test file for Tag
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Tag } from './index'

describe('Tag Component', () => {
	it('renders on the page', () => {
		render(<Tag />)

		const component = screen.getByTestId('Tag')

		expect(component).toBeInTheDocument()
	})
})
