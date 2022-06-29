import { StudyStatus } from '@prisma/client'
import { Session } from 'next-auth'
import { ApiStudy, OptimisticStudy, Study, StudyInput, StudyInputMap } from 'types/Study'

// TODO: The types in here are gnarly, it'd be valuable to simplify this

export const standardizeApiStudy = (apiStudy: ApiStudy): Study => ({
	...apiStudy,
	endDate: new Date(apiStudy.endDate),
	submissionDate: new Date(apiStudy.submissionDate)
})

type StudyKeyHandler<T extends keyof StudyInput> = (
	value: string,
	session: Session | null
) => Study[StudyInputMap[T]]

const createStudyImage: StudyKeyHandler<'image'> = (imageUrl: StudyInput['image']) =>
	imageUrl
		? {
				id: new Date().toISOString(),
				name: '',
				fileType: 'image',
				uploadedById: null,
				studyId: null,
				url: imageUrl
		  }
		: undefined

const createStudyUser: StudyKeyHandler<'coordinator'> = (_value, session) => [
	{
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
	title: (value) => value
}

// TODO: coordinator should be an object from a react select component
export const createOptimisticStudyFromFormData = (
	data: StudyInput,
	session: Session | null
): OptimisticStudy =>
	(Object.keys(data) as (keyof StudyInput)[]).reduce(
		(accumulator, key) => ({
			...accumulator,
			[key]: optimisticStudyKeyHandlers[key](data[key] || '', session)
		}),
		{} as OptimisticStudy
	)

export const createPartialStudyFromFormData = (
	data: Partial<StudyInput>,
	session: Session | null
) =>
	(Object.keys(data) as (keyof StudyInput)[]).reduce(
		(accumulator, key) => ({
			...accumulator,
			[key]: optimisticStudyKeyHandlers[key](data[key] || '', session)
		}),
		{}
	)
