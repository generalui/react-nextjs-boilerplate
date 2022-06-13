/**
 * Test file for ModalWindow
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ModalWindow } from './index'

describe('ModalWindow Component', () => {
	it('renders on the page', () => {
		render(<ModalWindow />)

		const component = screen.getByTestId('ModalWindow')

		expect(component).toBeInTheDocument()
	})
})
