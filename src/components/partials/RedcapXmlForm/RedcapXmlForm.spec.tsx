/**
 * Test file for RedcapXmlForm
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { RedcapXmlForm } from './index'

describe('RedcapXmlForm Component', () => {
	it('renders on the page', () => {
		render(<RedcapXmlForm />)

		const component = screen.getByTestId('RedcapXmlForm')

		expect(component).toBeInTheDocument()
	})
})
