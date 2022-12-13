/**
 * Test file for UpdatePassword
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { UpdatePassword } from './index'

describe('UpdatePassword Component', () => {
	it('renders on the page', () => {
		render(<UpdatePassword />)

		const component = screen.getByTestId('UpdatePassword')

		expect(component).toBeInTheDocument()
	})
})
