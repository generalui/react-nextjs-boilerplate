/**
 * This is a test file for FileInput
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { FileInput } from './index'

describe('FileInput Component', () => {
	it('renders on the page', () => {
		render(<FileInput />)

		const component = screen.getByTestId('FileInput')

		expect(component).toBeInTheDocument()
	})
})
