/**
 * Test file for ModalFooter
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ModalFooter } from './index'

describe('ModalFooter Component', () => {
	it('renders on the page', () => {
		render(<ModalFooter />)

		const component = screen.getByTestId('ModalFooter')

		expect(component).toBeInTheDocument()
	})
})
