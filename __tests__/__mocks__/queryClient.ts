export const mockQueryClient = {
	queryCache: { listeners: [], config: {}, queries: [], queriesMap: {} },
	mutationCache: {
		listeners: [],
		config: {},
		mutations: [],
		mutationId: 0
	},
	defaultOptions: {
		queries: { onError: [] },
		mutations: { onError: [] }
	},
	queryDefaults: [],
	mutationDefaults: []
}

jest.mock('utils/client/react-query', () => {
	return {
		reactQueryClient: jest.fn().mockImplementation(() => mockQueryClient)
	}
})
