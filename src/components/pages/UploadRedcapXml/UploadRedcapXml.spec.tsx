/**
 * Test file for UploadRedcapXml
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { UploadRedcapXml } from './index'

describe('UploadRedcapXml Component', () => {
	it('renders on the page', () => {
		render(<UploadRedcapXml />)

		const component = screen.getByTestId('UploadRedcapXml')

		expect(component).toBeInTheDocument()
	})
})
