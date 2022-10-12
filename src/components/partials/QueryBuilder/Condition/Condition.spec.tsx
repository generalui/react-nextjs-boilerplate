/**
 * Test file for Condition
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Form } from 'partials/Form'
import { Condition } from 'partials/QueryBuilder/Condition'

describe('Condition Component', () => {
	it('renders on the page', () => {
		render(
			<Form
				onSubmit={() => {
					return
				}}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Condition
							fields={[]}
							conditions={[]}
							onFieldTypeChange={(value) => {
								expect(value)
							}}
						/>
					</form>
				)}
			/>
		)

		const component = screen.getByTestId('Condition')

		expect(component).toBeInTheDocument()
	})
})
