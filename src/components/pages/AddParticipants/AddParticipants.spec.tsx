/**
 * Test file for AddParticipants
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { AddParticipants } from './index'

describe('AddParticipants Component', () => {
	it('renders on the page', () => {
		render(<AddParticipants />)

		const component = screen.getByTestId('AddParticipants')

		expect(component).toBeInTheDocument()
	})
})
