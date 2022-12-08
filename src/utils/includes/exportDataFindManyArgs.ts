import { Prisma } from '@prisma/client'
import { SchemaOptions } from 'pages/ExportData/ExportData.types'

type ExportDataFindManyArgs = Record<
	SchemaOptions,
	| Prisma.StudyFindManyArgs
	| Prisma.UserFindManyArgs
	| Prisma.ParticipantFindManyArgs
	| Prisma.SurveyResponseFindManyArgs
	| Prisma.EventLogFindManyArgs
>

export const exportDataFindManyArgs: ExportDataFindManyArgs = {
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
	},
	participant: {
		select: {
			id: true,
			insertedAt: true,
			updatedAt: true,
			userId: true,
			studies: {
				select: {
					studyId: true
				}
			}
		}
	},
	surveyResponse: {
		include: {
			study: {
				select: {
					id: true
				}
			}
		}
	},
	eventLog: {
		select: {
			id: true,
			model: true,
			recordIds: true,
			methodType: true,
			insertedAt: true,
			userId: true
		}
	}
}
