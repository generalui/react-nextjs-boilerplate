import { Prisma } from '@prisma/client'

type ExportDataFindManyArgs = {
	todo: Prisma.TodoFindManyArgs
	user: Prisma.UserFindManyArgs
	participant: Prisma.ParticipantFindManyArgs
	surveyResponse: Prisma.SurveyResponseFindManyArgs
	eventLog: Prisma.EventLogFindManyArgs
}

export const exportDataFindManyArgs: ExportDataFindManyArgs = {
	todo: {
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
			todos: {
				select: {
					todoId: true
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
			todos: {
				select: {
					todoId: true
				}
			}
		}
	},
	surveyResponse: {
		include: {
			todo: {
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
