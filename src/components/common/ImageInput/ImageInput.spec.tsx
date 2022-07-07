/**
 * Test file for ImageInput
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Form } from 'partials/Form'
import { ImageInput } from './index'

describe('ImageInput Component', () => {
	// Mock revokeObjectURL
	global.URL.revokeObjectURL = jest.fn()

	it('renders on the page', () => {
		render(
			<Form
				onSubmit={() => {
					return
				}}
				render={() => <ImageInput name={''} />}
			/>
		)

		const component = screen.getByTestId('ImageInput')

		expect(component).toBeInTheDocument()
	})
})
