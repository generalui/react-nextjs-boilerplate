import { Prisma } from '@prisma/client'

export const studies: (Prisma.StudyCreateInput & { id: string; imageUrl?: string })[] =
	process.env.NODE_ENV === 'development'
		? [
				{
					id: 'todo1',
					title: 'Test double hashtable',
					description:
						'Test double hashtable dynamic types big O functional programming Dijkstra legacy native lazy load DOM. Gzip webpack Twitter compiler controller domain specific language website. Dynamic first in first out consensus strongly typing LLVM CSS-in-JS concurrent Internet Explorer bitwise operator. Class linked list configuration scale f*** pivot stateless engineer lazy test-driven.',
					users: { create: { user: { connect: { email: 'test@email.com' } } } },
					submissionDate: new Date('2022-01-01'),
					endDate: new Date('2022-10-01'),
					imageUrl:
						'https://res.cloudinary.com/diepbgnym/image/upload/v1656026758/documents/study1_qg1c9x.png'
				},
				{
					id: 'todo2',
					title: 'Npm bubble sort mutation',
					description:
						'Npm bubble sort mutation observer browser child i. Netscape atomic design dog-piling S3 compile vaporware Ubuntu time-to-interactive. Module YAML concurrent Stack Overflow compile Dijkstra k. Little Bobby Tables test double neck beard instance LLVM brownfield. Npm program website observer pattern bitwise operator composition antipattern contributor concurrency Github.',
					users: { create: { user: { connect: { email: 'test@email.com' } } } },
					status: 'approved',
					submissionDate: new Date('2021-01-01'),
					endDate: new Date('2021-12-01'),
					imageUrl:
						'https://res.cloudinary.com/diepbgnym/image/upload/v1656026758/documents/study2_gsus5u.png'
				},
				{
					id: 'todo3',
					title: 'Consensus constant dynamic DOM JQuery pattern',
					description:
						'Consensus constant dynamic DOM JQuery pattern MacBook class state. S3 modern bundle Chrome object library lang composition TL CSV. Looks good to me behavior-driven command-line font Stack Overflow branch. JQuery cache brownfield senior state clean code JVM. Idiosyncratic contexts clean architecture production off-by-one error free as speech environment.',
					users: { create: { user: { connect: { email: 'test@email.com' } } } },
					status: 'archived',
					submissionDate: new Date('2020-01-01'),
					endDate: new Date('2020-05-01'),
					imageUrl:
						'https://res.cloudinary.com/diepbgnym/image/upload/v1656026758/documents/study3_cw3kvw.png'
				}
		  ]
		: []
