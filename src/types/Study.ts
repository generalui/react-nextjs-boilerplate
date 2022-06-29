import { Document, Prisma, Study as S, User } from '@prisma/client'
import { z } from 'zod'

export const StudySchema = z.object({
	title: z.string(),
	coordinator: z.string(),
	endDate: z.string(),
	description: z.string(),
	image: z.string().optional(), // base 64 string
	dataTypes: z.object({ label: z.string(), value: z.string() }).array()
})

export type StudyInput = z.infer<typeof StudySchema>

export type Study = Prisma.StudyGetPayload<{
	include: {
		users: {
			include: {
				user: true
			}
		} // Include all users in the returned object,
		image: true
	}
}>

// export type Study = S & { users: (CoordinatorsOnStudies & { user: User })[] } & { image?: Document }

export type OptimisticStudy = S & { users: { user: Pick<User, 'email' | 'name'> }[] } & {
	image?: Pick<Document, 'url'>
}

export type selectOptionsType = {
	value: string
	label: string
}
