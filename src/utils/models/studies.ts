import { StudyDataTypes, StudyStatus } from '@prisma/client'
import { Session } from 'next-auth'
import { ApiStudy, OptimisticStudy, Study, StudyInput, StudyInputMap } from 'types/Study'

// TODO: The types in here are gnarly, it'd be valuable to simplify this

export const standardizeApiStudy = (apiStudy: ApiStudy): Study => ({
	...apiStudy,
	endDate: new Date(apiStudy.endDate),
	submissionDate: new Date(apiStudy.submissionDate)
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
				inserted_at: new Date(),
				image: {
					id: new Date().toISOString(),
					name: '',
					fileType: 'image',
					uploadedById: null,
					studyId: null,
					url: imageUrl
				}
		  }
		: null

const createStudyUser: StudyKeyHandler<'coordinator'> = (_value, session) => [
	{
		studyId: new Date().toISOString(),
		userId: new Date().toISOString(),
		inserted_at: new Date(),
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

const optimisticStudyKeyHandlers: {
	[key in keyof Required<StudyInput>]: StudyKeyHandler<key>
} = {
	coordinator: createStudyUser,
	description: (value) => value,
	endDate: (endDate) => new Date(endDate),
	image: createStudyImage,
	status: (value) => value as StudyStatus,
	title: (value) => value,
	dataTypes: (dataTypes) => dataTypes.map((dataType) => dataType.value as StudyDataTypes)
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
			[key]: value ? optimisticStudyKeyHandlers[key](value as any, session) : undefined
		}
	}, {} as OptimisticStudy)

export const createPartialStudyFromFormData = (
	data: Partial<StudyInput>,
	session: Session | null
) =>
	(Object.keys(data) as (keyof StudyInput)[]).reduce((accumulator, key) => {
		const value = data[key] as StudyInput[typeof key]
		return {
			...accumulator,
			[key]: value ? optimisticStudyKeyHandlers[key](value as any, session) : undefined
		}
	}, {})
