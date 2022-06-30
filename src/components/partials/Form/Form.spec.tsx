/**
 * Test file for Form
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Form } from './index'

describe('Form Component', () => {
	it('renders on the page', () => {
		render(<Form onSubmit={jest.fn()} render={(props) => <div data-testid={props}></div>} />)

		const component = screen.getByTestId('Form')

		expect(component).toBeInTheDocument()
	})
})
