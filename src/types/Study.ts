import { Study as S, User } from '@prisma/client'
import { z } from 'zod'

export const StudySchema = z.object({
	title: z.string(),
	coordinator: z.string(),
	endDate: z.string(),
	description: z.string(),
	image: z.string() // base 64 string
})

export type StudyInput = z.infer<typeof StudySchema>

export type Study = S & { users: User[] }
