import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
	// Uncomment this code to add event logging
	// log: [{ level: 'query', emit: 'event' }]
})

// Uncomment this code to add event logging
// prisma.$on('query', (e: Prisma.QueryEvent) => {
// 	// Add query middleware event logging here
// })
