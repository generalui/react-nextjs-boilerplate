import { Document, Study as S, User } from '@prisma/client'
import { z } from 'zod'

export const StudySchema = z.object({
	title: z.string(),
	coordinator: z.string(),
	endDate: z.string(),
	description: z.string(),
	image: z.string().optional() // base 64 string
})

export type StudyInput = z.infer<typeof StudySchema>

export type Study = S & { users: { user: User }[] } & { image?: Document }

export type OptimisticStudy = S & { users: { user: Pick<User, 'email' | 'name'> }[] } & {
	image?: Pick<Document, 'url'>
}
