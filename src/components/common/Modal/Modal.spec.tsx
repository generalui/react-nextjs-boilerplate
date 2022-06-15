/**
 * Test file for Modal
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Modal } from './index'

describe('Modal Component', () => {
	it('renders on the page', () => {
		render(
			<Modal show={true}>
				<h1>This is a Modal</h1>
			</Modal>
		)

		const component = screen.getByTestId('Modal')

		expect(component).toBeInTheDocument()
	})
})
