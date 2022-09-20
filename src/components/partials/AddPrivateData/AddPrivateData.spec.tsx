/**
 * Test file for AddPrivateData
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { AddPrivateData } from './index'

describe('AddPrivateData Component', () => {
	it('renders on the page', () => {
		render(<AddPrivateData modalName='test' studyId='' />)

		const component = screen.getByTestId('AddPrivateData')

		expect(component).toBeInTheDocument()
	})
})
