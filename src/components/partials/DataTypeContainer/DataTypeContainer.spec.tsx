/**
 * Test file for DataTypeContainer
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { DataTypeContainer } from './index'

describe('DataTypeContainer Component', () => {
	it('renders on the page', () => {
		render(<DataTypeContainer todo={undefined} />)

		const component = screen.getByTestId('DataTypeContainer')

		expect(component).toBeInTheDocument()
	})
})
