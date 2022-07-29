// TODO: move this logic code should not have nested utils
import { Prisma } from '@prisma/client'

type StudyIncludes = { include: Prisma.StudyInclude }

// Included on all studies
export const studyIncludes: StudyIncludes = {
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
