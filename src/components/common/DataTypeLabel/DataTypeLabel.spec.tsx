/**
 * Test file for DataTypeLabel
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { DataTypeLabel } from './index'

describe('DataTypeLabel Component', () => {
	it('renders on the page', () => {
		render(<DataTypeLabel img='/icons/consents.svg' />)

		const component = screen.getByTestId('DataTypeLabel')

		expect(component).toBeInTheDocument()
	})
})
