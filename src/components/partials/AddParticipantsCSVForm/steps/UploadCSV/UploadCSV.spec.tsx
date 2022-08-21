/**
 * Test file for UploadCSV
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { UploadCSV } from './index'

describe('UploadCSV Component', () => {
	it('renders on the page', () => {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		render(<UploadCSV onSubmit={() => {}} />)

		const component = screen.getByTestId('UploadCSV')

		expect(component).toBeInTheDocument()
	})
})
