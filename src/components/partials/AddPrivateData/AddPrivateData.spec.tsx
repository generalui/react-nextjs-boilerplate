/**
 * Test file for AddPrivateData
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { AddPrivateData } from './index'

describe('AddPrivateData Component', () => {
	it('renders on the page', () => {
		render(<AddPrivateData modalName='test' />)

		const component = screen.getByTestId('AddPrivateData')

		expect(component).toBeInTheDocument()
	})
})
