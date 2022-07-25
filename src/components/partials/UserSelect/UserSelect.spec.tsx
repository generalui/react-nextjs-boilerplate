/**
 * Test file for UserSelect
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Form } from 'react-final-form'
import { UserSelect } from './index'

describe('UserSelect Component', () => {
	it('renders on the page', () => {
		render(
			<Form
				onSubmit={() => {
					return
				}}
				render={() => <UserSelect name='userSelect' />}
			/>
		)

		const component = screen.getByTestId('UserSelect')

		expect(component).toBeInTheDocument()
	})
})
