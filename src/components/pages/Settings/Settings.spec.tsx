/**
 * Test file for Settings
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Settings } from './index'

describe('Settings Component', () => {
	it('renders on the page', () => {
		render(<Settings />)

		const component = screen.getByTestId('Settings')

		expect(component).toBeInTheDocument()
	})
})
