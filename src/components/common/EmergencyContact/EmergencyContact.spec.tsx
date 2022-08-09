/**
 * Test file for EmergencyContact
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { EmergencyContact } from './index'

describe('EmergencyContact Component', () => {
	it('renders on the page', () => {
		render(<EmergencyContact />)

		const component = screen.getByTestId('EmergencyContact')

		expect(component).toBeInTheDocument()
	})
})
