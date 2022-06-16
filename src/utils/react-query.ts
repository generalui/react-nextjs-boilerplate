import { QueryClient } from 'react-query'

export const reactQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			onError: (error) => console.error({ error })
		},
		mutations: {
			onError: (error) => console.error({ error })
		}
	}
})
