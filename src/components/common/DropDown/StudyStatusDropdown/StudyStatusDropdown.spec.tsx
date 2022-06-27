/**
 * Test file for StudyStatusDropdown
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { StudyStatusDropdown } from './index'

describe('StudyStatusDropdown Component', () => {
	it('renders on the page', () => {
		render(<StudyStatusDropdown onChange={jest.fn()} value={'new'} />)

		const component = screen.getByTestId('StudyStatusDropdown')

		expect(component).toBeInTheDocument()
	})
})
