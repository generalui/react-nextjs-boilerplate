import { User } from '@prisma/client'

export interface Participant {
	id: string
	insertedAt: Date
	updatedAt: Date
	user: User
	userId: string
	currentName: string
	enrolledTribe: string
	emailAddress: string
	homePhone: string
	workPhone: string
	physicalAddress: string
}
