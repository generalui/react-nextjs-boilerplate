/**
 * Test file for Participants
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Participants } from './index'

describe('Participants Component', () => {
	it('renders on the page', () => {
		render(<Participants />)

		const component = screen.getByTestId('Participants')

		expect(component).toBeInTheDocument()
	})
})
