/**
 * Test file for ToggleButton
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Form } from 'partials/Form'
import { ToggleButton } from './index'

describe('ToggleButton Component', () => {
	it('renders on the page', () => {
		render(
			<Form
				onSubmit={() => {
					return
				}}
				render={() => <ToggleButton activeLabel='Active' inactiveLabel='Inactive' name='test' />}
			/>
		)

		const component = screen.getByTestId('ToggleButton')

		expect(component).toBeInTheDocument()
	})
})
