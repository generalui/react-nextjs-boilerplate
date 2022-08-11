/**
 * Test file for Detail
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Details } from './index'

describe('Detail Component', () => {
	it('renders on the page', () => {
		render(<Details details={[]} />)

		const component = screen.getByTestId('Details')

		expect(component).toBeInTheDocument()
	})
})
