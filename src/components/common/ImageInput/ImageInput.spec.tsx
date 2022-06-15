/**
 * Test file for ImageInput
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ImageInput } from './index'

describe('ImageInput Component', () => {
	it('renders on the page', () => {
		render(<ImageInput />)

		const component = screen.getByTestId('ImageInput')

		expect(component).toBeInTheDocument()
	})
})
