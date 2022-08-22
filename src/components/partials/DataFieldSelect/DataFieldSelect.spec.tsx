/**
 * Test file for DataFieldSelect
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Form } from 'react-final-form'
import { DataFieldSelect } from './index'

describe('DataFieldSelect Component', () => {
	it('renders on the page', () => {
		render(
			<Form
				onSubmit={() => {
					return
				}}
				render={() => <DataFieldSelect name='DataFieldSelectTest' />}
			/>
		)

		const component = screen.getByTestId('DataFieldSelect')

		expect(component).toBeInTheDocument()
	})
})
