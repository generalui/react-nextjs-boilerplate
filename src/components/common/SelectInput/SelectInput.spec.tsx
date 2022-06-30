/**
 * Test file for SelectInput
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { SelectInput } from './index'

describe('SelectInput Component', () => {
	it('renders on the page', () => {
		render(<SelectInput />)

		const component = screen.getByTestId('SelectInput')

		expect(component).toBeInTheDocument()
	})
})
