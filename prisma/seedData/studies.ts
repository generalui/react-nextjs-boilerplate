import { Prisma } from '@prisma/client'

export const studies: Prisma.StudyCreateInput[] = [
	{
		title: 'Study 1',
		objective: 'Check if the study is working',
		population: 10,
		startDate: new Date('2021-01-01'),
		endDate: new Date('2022-01-01'),
		type: 'test',
		topic: 'Testing',
		audience: 'Everyone',
		location: 'Somewhere'
	},
	{
		title: 'Study 2',
		objective: 'Test some more',
		population: 20,
		startDate: new Date('2022-01-01'),
		endDate: new Date('2023-01-01'),
		type: 'test2',
		topic: 'Something else',
		audience: 'Nobody',
		location: 'Nowhere'
	}
]
