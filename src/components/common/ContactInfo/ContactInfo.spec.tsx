/**
 * Test file for ContactInfo
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { ContactInfo } from './index'

describe('ContactInfo Component', () => {
	it('renders on the page', () => {
		render(<ContactInfo />)

		const component = screen.getByTestId('ContactInfo')

		expect(component).toBeInTheDocument()
	})
})
