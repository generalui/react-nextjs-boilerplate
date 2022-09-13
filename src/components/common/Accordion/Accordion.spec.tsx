/**
 * Test file for Accordion
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Accordion } from './index'

describe('Accordion Component', () => {
	it('renders on the page', () => {
		render(<Accordion />)

		const component = screen.getByTestId('Accordion')

		expect(component).toBeInTheDocument()
	})
})
