import { Prisma } from '@prisma/client'
import { SchemaOptions } from 'pages/ExportData/ExportData.types'

export const exportDataInclude: Record<
	SchemaOptions,
	Prisma.StudyFindManyArgs | Prisma.UserFindManyArgs
> = {
	study: {
		include: {
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
	},
	user: {
		where: {
			role: 'admin'
		},
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			studies: {
				select: {
					studyId: true
				}
			}
		}
	}
}
