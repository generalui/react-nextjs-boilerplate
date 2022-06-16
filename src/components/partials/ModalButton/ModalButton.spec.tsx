/**
 * Test file for ModalButton
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ModalButton } from './index'

describe('ModalButton Component', () => {
	it('renders on the page', () => {
		render(<ModalButton />)

		const component = screen.getByTestId('ModalButton')

		expect(component).toBeInTheDocument()
	})
})
