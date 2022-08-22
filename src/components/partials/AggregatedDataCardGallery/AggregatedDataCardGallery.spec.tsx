/**
 * Test file for AggregatedDataCardGallery
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { AggregatedDataCardGallery } from './index'

describe('AggregatedDataCardGallery Component', () => {
	it('renders on the page', () => {
		render(<AggregatedDataCardGallery aggregatedData={[]} />)

		const component = screen.getByTestId('AggregatedDataCardGallery')

		expect(component).toBeInTheDocument()
	})
})
