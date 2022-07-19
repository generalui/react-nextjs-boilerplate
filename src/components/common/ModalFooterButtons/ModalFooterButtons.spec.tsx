/**
 * Test file for ModalFooterButtons
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ModalFooterButtons } from './index'

describe('ModalFooterButtons Component', () => {
	it('renders on the page', () => {
		render(<ModalFooterButtons />)

		const component = screen.getByTestId('ModalFooterButtons')

		expect(component).toBeInTheDocument()
	})
})
