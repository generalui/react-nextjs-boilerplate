/**
 * Test file for ModalButton
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/'
import React from 'react'
import { ModalButton } from './index'

describe('ModalButton Component', () => {
	it('renders on the page', () => {
		render(<ModalButton buttonChildren='Open modal' modalTitle='Test Modal Button' name='test' />)

		const component = screen.getByTestId('ModalButton')

		expect(component).toBeInTheDocument()
	})
})
