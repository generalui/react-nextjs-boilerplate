/**
 * Test file for StudyDocumentation
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { StudyDocumentation } from './index'

describe('StudyDocumentation Component', () => {
	it('renders on the page', () => {
		render(<StudyDocumentation singleStudyId='1' loading={false} study={undefined} />)

		const component = screen.getByTestId('StudyDocumentation')

		expect(component).toBeInTheDocument()
	})
})
