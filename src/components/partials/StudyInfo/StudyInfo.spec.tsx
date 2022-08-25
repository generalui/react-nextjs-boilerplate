/**
 * Test file for StudyInfo
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { StudyInfo } from './index'

describe('StudyInfo Component', () => {
	it('renders on the page', () => {
		render(<StudyInfo isAdmin={false} singleStudyId='1' loading={true} study={undefined} />)

		const component = screen.getByTestId('StudyInfo')

		expect(component).toBeInTheDocument()
	})
})
