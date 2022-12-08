import { Prisma } from '@prisma/client'
import { SchemaOptions } from 'pages/ExportData/ExportData.types'

export const exportDataInclude: Record<SchemaOptions, Prisma.StudyInclude> = {
	study: {
		users: {
			select: {
				userId: true
			}
		},
		participants: {
			select: {
				participantId: true
			}
		},
		documentation: {
			select: {
				id: true
			}
		},
		surveyResponses: {
			select: {
				id: true
			}
		}
	}
}
