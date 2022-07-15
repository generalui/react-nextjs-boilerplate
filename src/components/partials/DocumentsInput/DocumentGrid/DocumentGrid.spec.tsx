/**
 * Test file for DocumentGrid
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { DocumentPreview } from 'partials/DocumentsInput/DocumentsInput.types'
import { DocumentGrid } from './index'

describe('DocumentGrid Component', () => {
	it('renders on the page', () => {
		const documents: DocumentPreview[] = [
			{
				type: 'image/png',
				name: 'image1.png',
				preview: 'blob:http://localhost:3000/4c62440e-f0fa-4ce9-9c88-521645c7b6fc'
			},
			{
				type: 'image/png',
				name: 'image2.png',
				preview: 'blob:http://localhost:3000/4c62440e-f0fa-4ce9-9c88-5r8645c7b6fc'
			}
		]

		render(<DocumentGrid documents={documents} />)

		const component = screen.getByTestId('DocumentGrid')

		expect(component).toBeInTheDocument()
	})
})
