import { Participant } from 'types/Participant'

export const participants: Pick<
	Participant,
	| 'userId'
	| 'currentName'
	| 'enrolledTribe'
	| 'emailAddress'
	| 'homePhone'
	| 'workPhone'
	| 'physicalAddress'
>[] = [
	{
		userId: 'testIdParticipant',
		currentName: 'Test Participant',
		enrolledTribe: 'Test Tribe',
		emailAddress: 'testParticipant@email.com',
		homePhone: '(505) 368-5118',
		workPhone: '(505) 368-5118',
		physicalAddress: '10800 Cibola Loop NW, Unit 3012 Albuquerque NM 87114'
	}
]
