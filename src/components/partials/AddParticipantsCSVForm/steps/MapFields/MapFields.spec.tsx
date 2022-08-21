/**
 * Test file for MapFields
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { MapFields } from './index'

describe('MapFields Component', () => {
	it('renders on the page', () => {
		render(<MapFields onSubmit={jest.fn()} />)

		const component = screen.getByTestId('MapFields')

		expect(component).toBeInTheDocument()
	})
})
