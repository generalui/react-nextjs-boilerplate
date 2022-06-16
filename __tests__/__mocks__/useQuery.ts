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

jest.mock('react-query', () => {
	return { useQuery: jest.fn(() => mockUseQueryReturn) }
})
