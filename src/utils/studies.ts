import { Session } from 'next-auth'
import { OptimisticStudy, StudyInput } from 'types/Study'

// TODO: coordinator should be an object from a react select component
export const createOptimisticStudyFromFormData = (
	data: StudyInput,
	session: Session | null
): OptimisticStudy => ({
	...data,
	id: new Date().toISOString(),
	users: [
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
	],
	imageId: new Date().toISOString(),
	image: data.image
		? {
				id: new Date().toISOString(),
				name: '',
				url: data.image,
				fileType: 'image',
				uploadedById: null,
				studyId: null
		  }
		: undefined,
	status: 'new',
	submissionDate: new Date(),
	endDate: new Date(data.endDate)
})
