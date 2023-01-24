/* eslint-disable @typescript-eslint/no-unused-vars */
export const mockUseRouterReturn = {
	locales: ['en'],
	defaultLocale: 'en',
	query: { foo: 'bar' },
	route: '/todos/test-todo',
	pathname: '/todos/[todoId]',
	asPath: '/todos/test-todo',
	events: {
		on: jest.fn((value: string, _eventHandler: () => void) => {
			console.log('useRouter events emitter - on', value)
		}),
		off: jest.fn((value: string, _eventHandler: () => void) => {
			console.log('useRouter events emitter - off', value)
		}),
		emit: jest.fn((value: string) => {
			console.log('useRouter events emitter - emit', value)
		})
	}
}

jest.mock('next/router', () => {
	return { useRouter: jest.fn(() => mockUseRouterReturn), push: jest.fn(() => null) }
})
