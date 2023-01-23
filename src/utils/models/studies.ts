import { StudyDataType, StudyStatus } from '@prisma/client'
import { uniqueId } from 'lodash'
import { Session } from 'next-auth'
import {
	ApiStudy,
	OptimisticStudy,
	Study,
	StudyInput,
	StudyInputMap,
	studyInputMap
} from 'types/Study'

// TODO: The types in here are gnarly, it'd be valuable to simplify this

export const standardizeApiStudy = (apiStudy: ApiStudy): Study => ({
	...apiStudy,
	endDate: new Date(apiStudy.endDate),
	submissionDate: new Date(apiStudy.submissionDate)
})

type StudyKeyHandler<T extends keyof StudyInput> = (
	value: StudyInput[T],
	session: Session | null
) => Study[StudyInputMap[T]]

const createStudyImage: StudyKeyHandler<'image'> = (image: StudyInput['image']) =>
	image
		? {
				id: new Date().toISOString(),
				imageId: new Date().toISOString(),
				studyId: '',
				userId: '',
				insertedAt: new Date(),
				image: {
					id: new Date().toISOString(),
					name: '',
					fileType: 'image',
					uploadedById: null,
					studyId: null,
					url: typeof image === 'string' ? image : URL.createObjectURL(image),
					insertedAt: new Date()
				}
		  }
		: null

const createStudyUser: StudyKeyHandler<'coordinator'> = (_value, session) => [
	{
		studyId: new Date().toISOString(),
		userId: new Date().toISOString(),
		insertedAt: new Date(),
		user: {
			id: new Date().toISOString(),
			email: session?.user?.email || '',
			name: session?.user?.name || '',
			emailVerified: null,
			password: null,
			image: null,
			role: 'admin'
		}
	}
]

const createDocumentation: StudyKeyHandler<'documentation'> = (documentation, session) => {
	if (!documentation) return []
	else {
		return documentation.map((document) => {
			return {
				id: new Date().toISOString(),
				uploadedById: session?.user?.email || '',
				name: document.name,
				url: '',
				fileType: document.type,
				studyId: null,
				insertedAt: new Date(document.lastModified)
			}
		})
	}
}

const optimisticStudyKeyHandlers: {
	[key in keyof Required<StudyInput>]: StudyKeyHandler<key>
} = {
	coordinator: createStudyUser,
	description: (value) => value,
	endDate: (endDate) => new Date(endDate),
	image: createStudyImage,
	status: (value) => value as StudyStatus,
	title: (value) => value,
	dataTypes: (value) => value as StudyDataType[],
	documentation: createDocumentation
}

export const createOptimisticStudyFromFormData = (
	data: StudyInput,
	session: Session | null
): OptimisticStudy =>
	(Object.keys(data) as (keyof StudyInput)[]).reduce(
		(accumulator, key) => {
			const value = data[key]
			const studyKey = studyInputMap[key]

			if (!studyKey) {
				return accumulator
			}

			return {
				...accumulator,
				[studyKey]: value ? optimisticStudyKeyHandlers[key](value, session) : undefined
			}
		},
		{
			submissionDate: new Date(),
			id: uniqueId()
		} as OptimisticStudy
	)

export const createPartialStudyFromFormData = (
	data: Partial<StudyInput>,
	session: Session | null
): Partial<Study> =>
	(Object.keys(data) as (keyof StudyInput)[]).reduce((accumulator, key) => {
		const value = data[key] as StudyInput[typeof key]
		return {
			...accumulator,
			[key]: value ? optimisticStudyKeyHandlers[key](value, session) : undefined
		}
	}, {})
