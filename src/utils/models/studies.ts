import { StudyDataTypes, StudyStatus } from '@prisma/client'
import { Session } from 'next-auth'
import {
	ApiDataVault,
	ApiStudy,
	DataVault,
	OptimisticStudy,
	Study,
	StudyInput,
	StudyInputMap
} from 'types/Study'

// TODO: The types in here are gnarly, it'd be valuable to simplify this

export const standardizeApiStudy = (apiStudy: ApiStudy): Study => ({
	...apiStudy,
	endDate: new Date(apiStudy.endDate),
	submissionDate: new Date(apiStudy.submissionDate)
})

export const standardizeDataVault = ({ _count, dataType, _max }: ApiDataVault): DataVault => ({
	_count,
	dataType,
	_max: { insertedAt: new Date(_max.insertedAt) }
})

// TODO: Study Input should only be used for form outgoing methods
type StudyKeyHandler<T extends keyof StudyInput> = (
	value: StudyInput[T],
	session: Session | null
) => Study[StudyInputMap[T]]

const createStudyImage: StudyKeyHandler<'image'> = (imageUrl: StudyInput['image']) =>
	imageUrl
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
					url: imageUrl,
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
			image: null
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
	dataTypes: (value) => value as StudyDataTypes[],
	documentation: createDocumentation
}

// TODO: coordinator should be an object from a react select component
export const createOptimisticStudyFromFormData = (
	data: StudyInput,
	session: Session | null
): OptimisticStudy =>
	(Object.keys(data) as (keyof StudyInput)[]).reduce((accumulator, key) => {
		const value = data[key] as StudyInput[typeof key]
		return {
			...accumulator,
			[key]: value ? optimisticStudyKeyHandlers[key](value, session) : undefined
		}
	}, {} as OptimisticStudy)

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
