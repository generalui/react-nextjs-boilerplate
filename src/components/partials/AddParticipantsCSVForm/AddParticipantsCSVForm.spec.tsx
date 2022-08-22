/**
 * Test file for RedcapXmlForm
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { AddParticipantsCSVForm } from './index'

describe('AddParticipantsCSVForm Component', () => {
	it('renders on the page', () => {
		render(<AddParticipantsCSVForm />)

		const component = screen.getByTestId('AddParticipantsCSVForm')

		expect(component).toBeInTheDocument()
	})
})
