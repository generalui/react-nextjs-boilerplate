export const mockUseRouterReturn = {
	locales: ['en'],
	defaultLocale: 'en',
	query: { foo: 'bar' },
	route: '/studies/test-study',
	pathName: '/studies/test-study',
	asPath: '/studies/test-study'
}

jest.mock('next/router', () => {
	return { useRouter: jest.fn(() => mockUseRouterReturn), push: jest.fn(() => null) }
})
