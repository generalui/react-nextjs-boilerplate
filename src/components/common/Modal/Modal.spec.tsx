/**
 * Test file for Modal
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Modal } from './index'

describe('Modal Component', () => {
	it('renders on the page', () => {
		render(<Modal />)

		const component = screen.getByTestId('Modal')

		expect(component).toBeInTheDocument()
	})
})
