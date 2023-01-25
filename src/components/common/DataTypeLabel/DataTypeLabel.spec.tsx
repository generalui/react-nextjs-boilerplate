/**
 * Test file for DataTypeLabel
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { DataTypeLabel } from './index'

describe('DataTypeLabel Component', () => {
	it('renders on the page', () => {
		render(<DataTypeLabel img='/icons/analyses.svg' dataType='analyses' />)

		const component = screen.getByTestId('DataTypeLabel')

		expect(component).toBeInTheDocument()
	})
})
