/**
 * Test file for MapRedcapFields
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { MapRedcapFields } from './index'

describe('MapRedcapFields Component', () => {
	it('renders on the page', () => {
		render(<MapRedcapFields onSubmit={jest.fn} />)

		const component = screen.getByTestId('MapRedcapFields')

		expect(component).toBeInTheDocument()
	})
})
