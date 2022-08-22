/**
 * Test file for RedcapXml
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { RedcapXml } from './index'

describe('RedcapXml Component', () => {
	it('renders on the page', () => {
		render(<RedcapXml />)

		const component = screen.getByTestId('RedcapXml')

		expect(component).toBeInTheDocument()
	})
})
