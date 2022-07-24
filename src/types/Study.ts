import { Prisma, StudyDataTypes, StudyStatus, User } from '@prisma/client'
import { z } from 'zod'
import { ListData } from 'partials/List/List.types'

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
		dataVault: true
	}
}>

export type ApiStudy = Omit<Study, 'endDate' | 'submissionDate'> & {
	endDate: string
	submissionDate: string
}

export type OptimisticStudy = Study & { users: { user: User }[] }

type StudyInputToStudyMap = { [key in keyof StudyInput]: keyof Study }

export interface DataVault extends ListData {
	_count: number
	dataType: StudyDataTypes
	_max: { inserted_at: Date }
}

export type ApiDataVault = Omit<DataVault, '_max'> & { _max: { inserted_at: string } }

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

// TODO: date schema should a date after the current data?
export const StudySchema = z.object({
	title: z.string(),
	coordinator: z.string().email(),
	endDate: z.string(),
	description: z.string(),
	status: z.nativeEnum(StudyStatus).optional().default('new'),
	image: z.any().optional(),
	// TODO: dataTypes should be an array only containing values
	dataTypes: z
		.object({ label: z.string(), value: z.string() })
		.array()
		.refine((data) => data.length > 0, {
			message: 'At least one data type required',
			path: ['dataTypes'] // path of error
		}),
	documentation: z.any().array().optional()
})

// The shape of data in outgoing axios requests
export type StudyInput = z.infer<typeof StudySchema>

export const DataVaultSchema = z.object({
	dataType: z
		.object({ label: z.string(), value: z.nativeEnum(StudyDataTypes) })
		.transform(({ value }) => value),
	dataVault: z.any().array()
})

// The shape of data in outgoing axios requests
export type DataVaultInput = z.infer<typeof DataVaultSchema>
