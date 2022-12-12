/**
 * Test file for UpdatePasswordForm
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { UpdatePasswordForm } from './index'

describe('UpdatePasswordForm Component', () => {
	it('renders on the page', () => {
		render(<UpdatePasswordForm />)

		const component = screen.getByTestId('UpdatePasswordForm')

		expect(component).toBeInTheDocument()
	})
})
