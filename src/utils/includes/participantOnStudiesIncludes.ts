// TODO: move this logic code should not have nested utils
import { Prisma } from '@prisma/client'

type ParticipantsOnStudiesIncludes = { include: Prisma.ParticipantsOnStudiesInclude }

export const participantOnStudyIncludesConsent: ParticipantsOnStudiesIncludes = {
	include: {
		consent: true
	}
}
