/**
 * This is a test file for PageWrapper
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { PageWrapper } from './index'

describe('PageWrapper Component', () => {
	it('renders on the page', () => {
		render(<PageWrapper />)

		const component = screen.getByTestId('PageWrapper')

		expect(component).toBeInTheDocument()
	})
})
