export type SeedUser = {
	email: string
	name: string
	password?: string
	id?: string
}

export const users: SeedUser[] = [
	{
		email: 'test@email.com',
		name: 'Test 👷',
		password: 'testPassw0rd!',
		id: 'testId'
	},
	{
		email: 'testParticipant@email.com',
		name: 'Test Participant',
		password: 'testPassw0rd!',
		id: 'testIdParticipant'
	}
]
