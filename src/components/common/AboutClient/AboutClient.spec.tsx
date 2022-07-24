/**
 * Test file for AboutClient
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import { AboutClient } from './index'

describe('AboutClient Component', () => {
	it('renders on the page', () => {
		render(<AboutClient />)

		const component = screen.getByTestId('AboutClient')

		expect(component).toBeInTheDocument()
	})
})
