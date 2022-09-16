/**
 * Test file for Dropzone
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Dropzone } from './index'

describe('Dropzone Component', () => {
	it('renders on the page', () => {
		render(
			<Dropzone onChange={jest.fn()} onError={jest.fn()}>
				Test
			</Dropzone>
		)

		const component = screen.getByTestId('Dropzone')

		expect(component).toBeInTheDocument()
	})
})
