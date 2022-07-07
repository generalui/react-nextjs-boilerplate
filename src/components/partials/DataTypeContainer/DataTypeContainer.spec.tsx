/**
 * Test file for DataTypeContainer
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { DataTypeContainer } from './index'

describe('DataTypeContainer Component', () => {
	it('renders on the page', () => {
		render(<DataTypeContainer tags={[]} />)

		const component = screen.getByTestId('DataTypeContainer')

		expect(component).toBeInTheDocument()
	})
})
