import { Todo } from 'types/Todo'

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
	todos: {
		id: new Date().toISOString(),
		image: {
			insertedAt: new Date(),
			imageId: '',
			todoId: '',
			userId: '',
			image: {
				id: '',
				insertedAt: new Date(),
				uploadedById: '',
				name: '',
				url: '',
				fileType: '',
				todoId: ''
			}
		},
		title: 'Test Todo',
		description: 'Test',
		endDate: new Date(),
		submissionDate: new Date(),
		imageId: null,
		status: 'new',
		users: [
			{
				todoId: '',
				userId: '',
				insertedAt: new Date(),
				user: {
					id: '',
					email: '',
					firstName: '',
					lastName: '',
					role: 'admin',
					createdAt: new Date(),
					name: '',
					emailVerified: new Date(),
					password: ''
				}
			}
		],
		dataTypes: [],
		documentation: []
	} as Todo
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
