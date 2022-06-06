import { render, screen } from '@testing-library/react'
import '__mocks__/all'
import { Home } from 'pages/Home'

describe('Home', () => {
	it('renders a heading', () => {
		render(<Home />)

		const heading = screen.getByRole('heading', {
			name: /welcome to the native biodata consortium web portal!/i
		})

		expect(heading).toBeInTheDocument()
	})
})
