/**
 * Test file for DataTypesSelect
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Form } from 'react-final-form'
import { DataTypesSelect } from './index'

describe('DataTypesSelect Component', () => {
	it('renders on the page', () => {
		render(
			<Form
				onSubmit={() => {
					return
				}}
				render={() => <DataTypesSelect name='test' />}
			/>
		)

		const component = screen.getByTestId('DataTypesSelect')

		expect(component).toBeInTheDocument()
	})
})
