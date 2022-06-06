export const mockUseRouterReturn = {
	locales: ['en'],
	defaultLocale: 'en',
	query: { foo: 'bar' }
}

jest.mock('next/router', () => {
	return { useRouter: jest.fn(() => mockUseRouterReturn) }
})
