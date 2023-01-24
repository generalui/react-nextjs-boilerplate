import { Prisma, User } from '@prisma/client'
import { z } from 'zod'

export const ParticipantSchema = z.object({
	email: z.string().trim().email(),
	name: z.string().trim()
})

export const AddParticipantsSchema = z.object({
	todoId: z.string(),
	participants: z.array(ParticipantSchema)
})

export type AddParticipantsInput = z.infer<typeof AddParticipantsSchema>
export type ParticipantInput = z.infer<typeof ParticipantSchema>

export type Participant = Prisma.ParticipantGetPayload<true>

export type NewParticipants = {
	user?: User | undefined
	password?: string | undefined
	userIsAlreadyOnTodo?: boolean | undefined
	userIsAlreadyCreated?: boolean | undefined
	todo?: string | undefined
}[]
