import { render, screen } from '@testing-library/react'
import React from 'react'
import Home from 'components/pages/Home/Home'

describe('Home', () => {
	it('renders a heading', () => {
		render(<Home />)

		const heading = screen.getByRole('heading', {
			name: /welcome to the genui react starter!/i
		})

		expect(heading).toBeInTheDocument()
	})
})
