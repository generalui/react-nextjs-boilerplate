/**
 * Test file for Detail
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Detail } from './index'

describe('Detail Component', () => {
	it('renders on the page', () => {
		render(<Detail label={''} />)

		const component = screen.getByTestId('Detail')

		expect(component).toBeInTheDocument()
	})
})
