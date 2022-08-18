/**
 * Test file for IdleTimer
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { IdleTimer } from './index'

describe('IdleTimer Component', () => {
	it('renders on the page', () => {
		render(<IdleTimer />)

		const component = screen.getByTestId('IdleTimer')

		expect(component).toBeInTheDocument()
	})
})
