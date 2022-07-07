import { Study } from 'types/Study'

export const mockUseQueryBaseReturn = {
	data: undefined,
	error: null,
	isError: false,
	isIdle: false,
	isLoading: false,
	isLoadingError: false,
	isRefetchError: false,
	isSuccess: true,
	status: 'success'
}

const mockUseQueryDataMap: Record<string, Record<string, unknown>> = {
	studies: {
		id: new Date().toISOString(),
		title: 'Test Study',
		description: 'Test',
		endDate: new Date(),
		submissionDate: new Date(),
		imageId: null,
		status: 'new',
		users: [
			{
				user: {
					name: 'Test User'
				}
			}
		]
	} as Study
}

export const mockMutateFunction = jest.fn((args) => console.log('mutate', args))

export const mockUseMutationReturn = {
	...mockUseQueryBaseReturn,
	mutate: mockMutateFunction,
	reset: jest.fn(() => {
		console.log('React query reset called')
	})
}

jest.mock('react-query', () => {
	return {
		...jest.requireActual('react-query'),
		useMutation: jest.fn(() => mockUseMutationReturn),
		useQuery: jest.fn((queryKey: string[]) => {
			return {
				...mockUseQueryBaseReturn,
				data: mockUseQueryDataMap[queryKey[0]] || undefined
			}
		})
	}
})
