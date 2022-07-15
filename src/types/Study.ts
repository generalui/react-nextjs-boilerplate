import { Prisma, StudyStatus, User } from '@prisma/client'
import { z } from 'zod'

export const StudySchema = z.object({
	title: z.string(),
	coordinator: z.string(),
	endDate: z.string(),
	description: z.string(),
	status: z.nativeEnum(StudyStatus).optional().default('new'),
	image: z.any().optional(),
	dataTypes: z.object({ label: z.string(), value: z.string() }).array(),
	documentation: z.any().array().optional()
})

// The shape of data in outgoing axios requests
export type StudyInput = z.infer<typeof StudySchema>

export type Study = Prisma.StudyGetPayload<{
	include: {
		users: {
			// Include all users in the returned object
			include: {
				user: true
			}
		}
		image: {
			include: {
				image: true
			}
		}
		documentation: true
	}
}>

export type ApiStudy = Omit<Study, 'endDate' | 'submissionDate'> & {
	endDate: string
	submissionDate: string
}

export type OptimisticStudy = Study & { users: { user: User }[] }

type StudyInputToStudyMap = { [key in keyof StudyInput]: keyof Study }

export interface StudyInputMap extends StudyInputToStudyMap {
	coordinator: 'users'
	description: 'description'
	endDate: 'endDate'
	image: 'image'
	status: 'status'
	title: 'title'
	dataTypes: 'dataTypes'
	documentation: 'documentation'
}

export type selectOptionsType = {
	value: string
	label: string
}
