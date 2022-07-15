/**
 * Test file for AggregatedDataCard
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { AggregatedDataCard } from './index'

describe('AggregatedDataCard Component', () => {
	it('renders on the page', () => {
		render(
			<AggregatedDataCard
				className='col-span-3 lg:col-span-1'
				title='title'
				dataValue='dataValue'
				subTitle='subTitle'
				description='description'
			/>
		)

		const component = screen.getByTestId('AggregatedDataCard')

		expect(component).toBeInTheDocument()
	})
})
