/**
 * Test file for StudyList
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { StudyList } from './index'

describe('StudyList Component', () => {
	it('renders on the page', () => {
		render(<StudyList studies={[]} />)

		const component = screen.getByTestId('StudyList')

		expect(component).toBeInTheDocument()
	})
})
