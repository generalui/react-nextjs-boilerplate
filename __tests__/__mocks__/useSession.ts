export const mockUseSessionReturn = {
	data: null,
	userId: '123',
	status: 'loading'
}

jest.mock('next-auth/react', () => {
	return { useSession: jest.fn(() => mockUseSessionReturn) }
})
