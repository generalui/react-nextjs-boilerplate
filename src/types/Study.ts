import { Document, Prisma, Study as S, StudyStatus, User } from '@prisma/client'
import { z } from 'zod'

export const StudySchema = z.object({
	title: z.string(),
	coordinator: z.string(),
	endDate: z.string(),
	description: z.string(),
	status: z.nativeEnum(StudyStatus).optional().default('new'),
	image: z.string().optional() // base 64 string
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

export type ApiStudy = Omit<Study, 'endDate' | 'submissionDate'> & {
	endDate: string
	submissionDate: string
}

export type OptimisticStudy = S & { users: { user: User }[] } & {
	image?: Document
}

type StudyInputToStudyMap = { [key in keyof StudyInput]: keyof Study }

export interface StudyInputMap extends StudyInputToStudyMap {
	coordinator: 'users'
	description: 'description'
	endDate: 'endDate'
	image: 'image'
	status: 'status'
	title: 'title'
}
