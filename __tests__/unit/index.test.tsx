import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import { Home } from 'pages/Home'

describe('Home', () => {
	it('renders a heading', () => {
		render(<Home />)

		const heading = screen.getByRole('heading', {
			name: /todo items/i
		})

		expect(heading).toBeInTheDocument()
	})
})
