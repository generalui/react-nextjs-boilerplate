/**
 * Test file for DropDownItemWithIcon
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { DropDownItemWithIcon } from './index'

describe('DropDownItemWithIcon Component', () => {
	it('renders on the page', () => {
		render(<DropDownItemWithIcon icon='DocumentIcon' label='REDCap' />)

		const component = screen.getByTestId('DropDownItemWithIcon')

		expect(component).toBeInTheDocument()
	})
})
