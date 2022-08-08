/**
 * Test file for ParticipantHome
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { ParticipantHome } from './index'

describe('ParticipantHome Component', () => {
	it('renders on the page', () => {
		render(<ParticipantHome />)

		const component = screen.getByTestId('ParticipantHome')

		expect(component).toBeInTheDocument()
	})
})
