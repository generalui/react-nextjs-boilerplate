/**
 * Test file for ActionButtons
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { ActionButtons } from './index'

describe('ActionButtons Component', () => {
	it('renders on the page', () => {
		render(<ActionButtons baseTextPath='' />)

		const component = screen.getByTestId('ActionButtons')

		expect(component).toBeInTheDocument()
	})
})
