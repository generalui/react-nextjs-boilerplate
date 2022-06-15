import { Prisma } from '@prisma/client'

export const studies: Prisma.StudyCreateInput[] = [
	{
		description: 'Test study 1',
		imageUrl: '/images/study1.png',
		title:
			'Real-time PCR designs to estimate nuclear and mitochondrial DNA copy number in forensic and ancient DNA studies',
		owner: { connect: { email: 'test@email.com' } },
		submissionDate: new Date('2022-01-01')
	},
	{
		description: 'Test study 2',
		imageUrl: '/images/study2.png',
		title:
			'Distribution of mitochondrial DNA lineages among Native American tribes of Northeastern North America',
		owner: { connect: { email: 'test@email.com' } },
		status: 'approved',
		submissionDate: new Date('2021-01-01')
	},
	{
		description: 'Test study 3',
		imageUrl: '/images/study3.png',
		title:
			'Development of Gene Editing and Cell Culture Capacity and Expertise in the Tribal Northern Plains',
		owner: { connect: { email: 'test@email.com' } },
		status: 'archived',
		submissionDate: new Date('2020-01-01')
	}
]
