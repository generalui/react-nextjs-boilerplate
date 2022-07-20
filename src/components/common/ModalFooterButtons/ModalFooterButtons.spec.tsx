/**
 * Test file for ModalFooterButtons
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { ModalFooterButtons } from './index'

describe('ModalFooterButtons Component', () => {
	it('renders on the page', () => {
		render(<ModalFooterButtons modalName={''} isLoading={false} />)

		const component = screen.getByTestId('ModalFooterButtons')

		expect(component).toBeInTheDocument()
	})
})
