// TODO: move this logic code should not have nested utils
import { Prisma } from '@prisma/client'

type TodoIncludes = { include: Prisma.TodoInclude }

export const todoIncludesParticipantIds: TodoIncludes = {
	include: {
		// Include all users in the returned object,
		participants: {
			include: {
				participant: {
					select: {
						id: true
					}
				}
			}
		}
	}
}

export const todoIncludesParticipants: TodoIncludes = {
	include: {
		// Include all users in the returned object,
		participants: {
			include: {
				participant: {
					include: {
						_count: true
					}
				}
			}
		}
	}
}
// Included on all todos
export const todoIncludes: TodoIncludes = {
	include: {
		// Include all users in the returned object,
		users: {
			include: {
				user: true
			}
		},
		// Include image as join to documents table
		image: {
			include: {
				image: true
			}
		},
		documentation: {
			orderBy: {
				insertedAt: 'desc'
			}
		}
	}
}
