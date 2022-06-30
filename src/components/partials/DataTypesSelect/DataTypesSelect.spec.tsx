/**
 * Test file for DataTypesSelect
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { DataTypesSelect } from './index'

describe('DataTypesSelect Component', () => {
	it('renders on the page', () => {
		render(<DataTypesSelect />)

		const component = screen.getByTestId('DataTypesSelect')

		expect(component).toBeInTheDocument()
	})
})
