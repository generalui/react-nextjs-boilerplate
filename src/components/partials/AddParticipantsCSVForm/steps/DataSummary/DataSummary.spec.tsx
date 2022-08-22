/**
 * Test file for DataSummary
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { DataSummary } from './index'

describe('DataSummary Component', () => {
	it('renders on the page', () => {
		render(
			<DataSummary onSubmit={jest.fn()} consents={0} unMappedFields={0} participantList={[]} />
		)

		const component = screen.getByTestId('DataSummary')

		expect(component).toBeInTheDocument()
	})
})
