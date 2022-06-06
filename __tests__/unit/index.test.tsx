import { render, screen } from '@testing-library/react'
import '__mocks__/useRouter'
import { SessionProvider } from 'next-auth/react'
import { Home } from 'pages/Home'

describe('Home', () => {
	it('renders a heading', () => {
		render(
			<SessionProvider session={null}>
				<Home />
			</SessionProvider>
		)

		const heading = screen.getByRole('heading', {
			name: /welcome to the native biodata consortium web portal!/i
		})

		expect(heading).toBeInTheDocument()
	})
})
