import { Prisma } from '@prisma/client'
import { z } from 'zod'

export const ParticipantSchema = z.object({
	email: z.string().trim().email()
})

export const AddParticipantsSchema = z.object({
	studyId: z.string(),
	participants: z.array(ParticipantSchema)
})

export type AddParticipantsInput = z.infer<typeof AddParticipantsSchema>

export type Participant = Prisma.ParticipantGetPayload<true>
