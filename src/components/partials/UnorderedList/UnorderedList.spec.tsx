/**
 * Test file for UnorderedList
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { UnorderedList } from './index'

describe('UnorderedList Component', () => {
	it('renders on the page', () => {
		render(<UnorderedList list={[]} />)

		const component = screen.getByTestId('UnorderedList')

		expect(component).toBeInTheDocument()
	})
})
