// TODO: move this logic code should not have nested utils
import { Prisma } from '@prisma/client'

type ParticipantsOnTodosIncludes = { include: Prisma.ParticipantsOnTodosInclude }

export const participantOnTodoIncludesConsent: ParticipantsOnTodosIncludes = {
	include: {
		consent: true
	}
}
