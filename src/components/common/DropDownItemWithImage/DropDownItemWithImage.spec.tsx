/**
 * Test file for DropDownItemWithImage
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { DropDownItemWithImage } from './index'

describe('DropDownItemWithImage Component', () => {
	it('renders on the page', () => {
		render(<DropDownItemWithImage src='/icons/redcap.svg' alt='REDCap Icon' label='REDCap' />)

		const component = screen.getByTestId('DropDownItemWithImage')

		expect(component).toBeInTheDocument()
	})
})
