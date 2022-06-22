/**
 * Test file for DropDown
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { DropDown } from './index'

describe('DropDown Component', () => {
	it('renders on the page', () => {
		render(<DropDown items={[]}>Dropdown</DropDown>)

		const component = screen.getByTestId('DropDown')

		expect(component).toBeInTheDocument()
	})
})
