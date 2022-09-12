import { Participant } from 'types/StudyParticipants'

export const participants: Pick<
	Participant,
	| 'id'
	| 'userId'
	| 'enrolledTribe'
	| 'homePhone'
	| 'workPhone'
	| 'physicalAddress'
	| 'emergencyContactName'
	| 'emergencyContactRelationship'
	| 'emergencyContactEmail'
	| 'emergencyContactHomePhone'
	| 'emergencyContactWorkPhone'
	| 'emergencyContactPhysicalAddress'
>[] = [
	{
		id: 'participant1',
		userId: 'testIdParticipant',
		enrolledTribe: 'Test Tribe',
		homePhone: '(505) 368-5118',
		workPhone: '(505) 368-5118',
		physicalAddress: '10800 Cibola Loop NW, Unit 3012 Albuquerque NM 87114',
		emergencyContactName: 'Bill Tsosie',
		emergencyContactRelationship: 'Spouse',
		emergencyContactEmail: 'bill@awesome.com',
		emergencyContactHomePhone: '(505) 368-5118 ',
		emergencyContactWorkPhone: '(505) 368-5118 ',
		emergencyContactPhysicalAddress: '10800 Cibola Loop NW, Unit 3012 Albuquerque NM 87114'
	}
]
