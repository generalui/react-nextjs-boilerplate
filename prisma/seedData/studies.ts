import { Prisma } from '@prisma/client'

export const studies: (Prisma.StudyCreateInput & { id: string; imageUrl?: string })[] =
	process.env.NODE_ENV === 'development'
		? [
				{
					id: 'testStudy1',
					description: 'Test study 1',
					title:
						'Real-time PCR designs to estimate nuclear and mitochondrial DNA copy number in forensic and ancient DNA studies',
					users: { create: { user: { connect: { email: 'test@email.com' } } } },
					submissionDate: new Date('2022-01-01'),
					endDate: new Date('2022-10-01'),
					imageUrl:
						'https://res.cloudinary.com/diepbgnym/image/upload/v1656026758/documents/study1_qg1c9x.png'
				},
				{
					id: 'testStudy2',
					description: 'Test study 2',
					title:
						'Distribution of mitochondrial DNA lineages among Native American tribes of Northeastern North America',
					users: { create: { user: { connect: { email: 'test@email.com' } } } },
					status: 'approved',
					submissionDate: new Date('2021-01-01'),
					endDate: new Date('2021-12-01'),
					imageUrl:
						'https://res.cloudinary.com/diepbgnym/image/upload/v1656026758/documents/study2_gsus5u.png'
				},
				{
					id: 'testStudy3',
					description: 'Test study 3',
					title:
						'Development of Gene Editing and Cell Culture Capacity and Expertise in the Tribal Northern Plains',
					users: { create: { user: { connect: { email: 'test@email.com' } } } },
					status: 'archived',
					submissionDate: new Date('2020-01-01'),
					endDate: new Date('2020-05-01'),
					imageUrl:
						'https://res.cloudinary.com/diepbgnym/image/upload/v1656026758/documents/study3_cw3kvw.png'
				}
		  ]
		: []
