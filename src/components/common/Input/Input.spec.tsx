/**
 * This is a test file for Input
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Form } from 'react-final-form'
import { Input } from './index'

describe('Input Component', () => {
	it('renders on the page', () => {
		render(
			<Form
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onSubmit={() => {}}
				render={() => <Input name='test' testId='Input' />}
			/>
		)

		const component = screen.getByTestId('Input')

		expect(component).toBeInTheDocument()
	})
})
