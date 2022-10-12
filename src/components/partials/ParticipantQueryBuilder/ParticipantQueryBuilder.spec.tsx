/**
 * Test file for ParticipantQueryBuilder
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { ParticipantQueryBuilder } from './index'

describe('ParticipantQueryBuilder Component', () => {
	it('renders on the page', () => {
		render(<ParticipantQueryBuilder />)

		const component = screen.getByTestId('ParticipantQueryBuilder')

		expect(component).toBeInTheDocument()
	})
})
