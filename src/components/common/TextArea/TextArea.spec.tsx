/**
 * Test file for TextArea
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { TextArea } from './index'

describe('TextArea Component', () => {
	it('renders on the page', () => {
		render(<TextArea />)

		const component = screen.getByTestId('TextArea')

		expect(component).toBeInTheDocument()
	})
})
