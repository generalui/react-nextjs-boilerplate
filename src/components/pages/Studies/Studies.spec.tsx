/**
 * Test file for Studies
 */
import { render } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { Studies } from './index'

describe('Studies Component', () => {
	it('renders on the page', () => {
		render(<Studies />)

		// TODO: Fix test
		// const component = screen.getByTestId('Studies')
		// expect(component).toBeInTheDocument()
	})
})
