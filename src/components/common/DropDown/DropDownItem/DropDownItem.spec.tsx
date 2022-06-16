/**
 * Test file for DropDownItem
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { DropDownItem } from './index'

describe('DropDownItem Component', () => {
	it('renders on the page', () => {
		render(
			<DropDownItem
				onClick={() => {
					console.log('test dropdown item clicked')
				}}
				value='test'
			>
				Test
			</DropDownItem>
		)

		const component = screen.getByTestId('DropDownItem')

		expect(component).toBeInTheDocument()
	})
})
