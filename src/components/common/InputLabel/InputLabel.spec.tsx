/**
 * Test file for InputLabel
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { InputLabel } from './index'

describe('InputLabel Component', () => {
	it('renders on the page', () => {
		render(<InputLabel label='test' name='test' />)

		const component = screen.getByTestId('InputLabel')

		expect(component).toBeInTheDocument()
	})

	it('does not render on the page when no label is provided', () => {
		render(
			<div data-testid='input-label-test-no-render'>
				<InputLabel />
			</div>
		)

		const component = screen.getByTestId('input-label-test-no-render')

		expect(component).toBeEmptyDOMElement()
	})
})
