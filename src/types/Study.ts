import { Prisma, StudyDataType, StudyStatus, User } from '@prisma/client'
import { ReactNode } from 'react'
import { PaginatedResponse } from 'types/PaginatedResponse'
import { z } from 'zod'
import { studyDefaultIncludes, studyIncludesConsent } from 'utils/includes/studyIncludes'
import { ListData } from 'partials/List/List.types'

export type Study = Prisma.StudyGetPayload<typeof studyDefaultIncludes>

export type StudyWithConsent = Prisma.StudyGetPayload<typeof studyIncludesConsent>

export type StudyWithParticipantIds = Prisma.StudyGetPayload<{
	include: {
		participants: {
			include: {
				participant: {
					select: {
						id: true
					}
				}
			}
		}
	}
}>

export type StudyWithParticipants = Prisma.StudyGetPayload<{
	include: {
		participants: {
			include: {
				participant: true
			}
		}
	}
}>

export type ParticipantQueryBuilderStudyPayload = Prisma.StudyGetPayload<{
	select: {
		id: true
		participants: {
			include: {
				// TODO: this should only select the fields relevant to the
				participant: {
					include: {
						studies: {
							select: {
								consent: true
							}
						}
					}
				}
			}
		}
	}
}>

export type ApiStudiesResponse = PaginatedResponse & {
	studies: ApiStudy[]
}

export type ApiStudiesServerResponse = PaginatedResponse & {
	studies: Study[]
}

export type ApiStudy = Omit<Study, 'endDate' | 'submissionDate'> & {
	endDate: string
	submissionDate: string
}

export type OptimisticStudy = Study & { users: { user: User }[] }

type StudyInputToStudyMap = { [key in keyof StudyInput]: keyof Study }

export const studyInputMap: StudyInputToStudyMap = {
	coordinator: 'users',
	description: 'description',
	endDate: 'endDate',
	image: 'image',
	status: 'status',
	title: 'title',
	dataTypes: 'dataTypes',
	documentation: 'documentation'
}

export type StudyInputMap = typeof studyInputMap

export type SelectOptionsType<T = unknown> = {
	value: string
	label: ReactNode | string
	meta?: T
}

export const StudySchema = z.object({
	title: z.string(),
	coordinator: z.object({ label: z.string(), value: z.string() }).transform((val) => val.value),
	endDate: z.string().refine((date) => {
		return new Date(date) > new Date()
	}, 'The end date must be after today'),
	description: z.string(),
	status: z.nativeEnum(StudyStatus).optional().default('new'),
	image: z.any().optional(),
	dataTypes: z
		.object({ label: z.string(), value: z.string() })
		.array()
		.transform((val) => val.map((v) => v.value))
		.refine((data) => data.length > 0, {
			message: 'At least one data type required',
			path: ['dataTypes'] // path of error
		}),
	documentation: z.any().array().optional()
})

// The shape of data in outgoing axios requests
export type StudyInput = z.infer<typeof StudySchema>

export type StudyInputPreTransform = Omit<StudyInput, 'coordinator' | 'dataTypes'> & {
	coordinator?: SelectOptionsType
	dataTypes?: SelectOptionsType[]
}

export const publicFilesSchema = z.object({
	documentation: z.any().array()
})
