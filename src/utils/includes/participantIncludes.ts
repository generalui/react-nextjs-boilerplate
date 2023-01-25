// TODO: move this logic code should not have nested utils
import { Prisma } from '@prisma/client'

type ParticipantIncludes = { include: Prisma.ParticipantInclude }

// export const participantIncludesConsent: ParticipantIncludes = {
// 	include: {
// 		_count: true
// 	}
// }

export const participantQueryInclude = {
	include: {
		todos: {
			include: {}
		}
	}
}
