export const mockUseQueryReturn = {
	data: [],
	error: null,
	isError: false,
	isIdle: false,
	isLoading: false,
	isLoadingError: false,
	isRefetchError: false,
	isSuccess: true,
	status: 'success'
}

export const mockMutateFunction = jest.fn((args) => console.log('mutate', args))

export const mockUseMutationReturn = {
	mutate: mockMutateFunction,
	error: null,
	isError: false,
	isIdle: false,
	isLoading: false,
	isLoadingError: false,
	isRefetchError: false,
	isSuccess: true,
	status: 'success'
}

jest.mock('react-query', () => {
	return {
		...jest.requireActual('react-query'),
		useMutation: jest.fn(() => mockUseMutationReturn),
		useQuery: jest.fn(() => mockUseQueryReturn)
	}
})
