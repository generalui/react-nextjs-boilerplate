/**
 * This is a test file for ProfileDropDown
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { ProfileDropDown } from './index'

describe('ProfileDropDown Component', () => {
	it('renders on the page', () => {
		render(<ProfileDropDown />)

		const component = screen.getByTestId('ProfileDropDown')

		expect(component).toBeInTheDocument()
	})
})
