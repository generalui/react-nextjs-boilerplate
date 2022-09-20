/**
 * Test file for ModalHeader
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ModalHeader } from './index'

describe('ModalHeader Component', () => {
	it('renders on the page', () => {
		render(<ModalHeader title='' />)

		const component = screen.getByTestId('ModalHeader')

		expect(component).toBeInTheDocument()
	})
})
