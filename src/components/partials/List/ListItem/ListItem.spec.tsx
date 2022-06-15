/**
 * Test file for ListItem
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ListItem } from './index'

describe('ListItem Component', () => {
	it('renders on the page', () => {
		render(
			<ListItem
				columns={[]}
				itemData={{
					name: ''
				}}
			/>
		)

		const component = screen.getByTestId('ListItem')

		expect(component).toBeInTheDocument()
	})
})
