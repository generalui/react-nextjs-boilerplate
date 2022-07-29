/**
 * Test file for PageContainer
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { PageContainer } from './index'

describe('PageContainer Component', () => {
	it('renders on the page', () => {
		render(<PageContainer />)

		const component = screen.getByTestId('PageContainer')

		expect(component).toBeInTheDocument()
	})
})
