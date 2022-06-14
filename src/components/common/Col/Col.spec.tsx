/**
 * Test file for Col
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Col } from './index'

describe('Col Component', () => {
	it('renders on the page', () => {
		render(<Col />)

		const component = screen.getByTestId('Col')

		expect(component).toBeInTheDocument()
	})
})
