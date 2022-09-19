/**
 * Test file for DropDownItem
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { DropDownItem } from './index'

describe('DropDownItem Component', () => {
	it('renders on the page', () => {
		render(<DropDownItem label='Test' onClick={jest.fn()} value='test' />)

		const component = screen.getByTestId('DropDownItem')

		expect(component).toBeInTheDocument()
	})
})
