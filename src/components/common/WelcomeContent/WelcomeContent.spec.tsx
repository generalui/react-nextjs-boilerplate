/**
 * Test file for WelcomeContent
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { AdminWelcome, ParticipantWelcome } from './index'

describe('AdminWelcome Component', () => {
	it('renders on the page', () => {
		render(<AdminWelcome />)

		const component = screen.getByTestId('AdminWelcome')

		expect(component).toBeInTheDocument()
	})
})

describe('ParticipantWelcome Component', () => {
	it('renders on the page', () => {
		render(<ParticipantWelcome participantName={'Test User'} />)

		const component = screen.getByTestId('ParticipantWelcome')

		expect(component).toBeInTheDocument()
	})
})
