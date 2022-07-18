/**
 * Test file for DocumentsInput
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Form } from 'react-final-form'
import { DocumentsInput } from './index'

describe('DocumentsInput Component', () => {
	it('renders on the page', () => {
		render(
			<Form
				onSubmit={() => {
					return
				}}
				render={() => <DocumentsInput name='documentsTest' />}
			/>
		)

		const component = screen.getByTestId('DocumentsInput')

		expect(component).toBeInTheDocument()
	})
})
