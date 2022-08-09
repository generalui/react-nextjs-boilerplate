/**
 * Test file for OrderedList
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { OrderedList } from './index'

describe('OrderedList Component', () => {
	it('renders on the page', () => {
		const list = [{ step: 1, text: 'First step' }]
		render(<OrderedList list={list} />)

		const component = screen.getByTestId('OrderedList')

		expect(component).toBeInTheDocument()
	})
})
