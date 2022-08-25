import { z } from 'zod'

export const ParticipantSchema = z.object({}).optional()

export const ParticipantOnStudySchema = z.object({
	participants: z.array(ParticipantSchema),
	participantCSVFile: z.array(z.any())
})

export type ParticipantOnStudyInput = z.infer<typeof ParticipantOnStudySchema>
