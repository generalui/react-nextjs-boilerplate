/**
 * Test file for SelectInput
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Form } from 'react-final-form'
import { SelectInput } from './index'

describe('SelectInput Component', () => {
	it('renders on the page', () => {
		render(
			<Form
				onSubmit={() => {
					return
				}}
				render={() => <SelectInput name='test' />}
			/>
		)

		const component = screen.getByTestId('SelectInput')

		expect(component).toBeInTheDocument()
	})
})
