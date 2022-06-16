/**
 * Test file for Loader
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Loader } from './index'

describe('Loader Component', () => {
	it('renders on the page', () => {
		render(<Loader fallback={<div data-testId='Loader'></div>} isLoading={true} />)

		const component = screen.getByTestId('Loader')

		expect(component).toBeInTheDocument()
	})
})
