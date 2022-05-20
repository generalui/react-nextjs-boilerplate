import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
	log: [{ level: 'query', emit: 'event' }]
})

prisma.$on('query', (e) => {
	console.log(e)
})
