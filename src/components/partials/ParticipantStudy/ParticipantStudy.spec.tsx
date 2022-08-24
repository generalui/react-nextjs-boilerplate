/**
 * Test file for ParticipantStudy
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { ParticipantStudy } from './index'

describe('ParticipantStudy Component', () => {
	it('renders on the page', () => {
		render(<ParticipantStudy />)

		const component = screen.getByTestId('ParticipantStudy')

		expect(component).toBeInTheDocument()
	})
})
