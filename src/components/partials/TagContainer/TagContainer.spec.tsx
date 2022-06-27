/**
 * Test file for TagContainer
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { TagContainer } from './index'

describe('TagContainer Component', () => {
	it('renders on the page', () => {
		render(<TagContainer tags={[]} />)

		const component = screen.getByTestId('TagContainer')

		expect(component).toBeInTheDocument()
	})
})
