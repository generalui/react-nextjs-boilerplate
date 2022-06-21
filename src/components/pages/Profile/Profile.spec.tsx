/**
 * Test file for Profile
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Profile } from './index'

describe('Profile Component', () => {
	it('renders on the page', () => {
		render(<Profile />)

		const component = screen.getByTestId('Profile')

		expect(component).toBeInTheDocument()
	})
})
