/**
 * Test file for ImageWithPlaceholder
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ImageWithPlaceholder } from './index'

describe('ImageWithPlaceholder Component', () => {
	it('renders on the page', () => {
		render(<ImageWithPlaceholder />)

		const component = screen.getByTestId('ImageWithPlaceholder')

		expect(component).toBeInTheDocument()
	})
})
