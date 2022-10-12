import { Prisma } from '@prisma/client'
import { z } from 'zod'

export type ApiParticipantQueryResults = {
	modelCount: number
	studyCount?: number
	list: Prisma.ParticipantGetPayload<{
		include: {
			_count: true
		}
	}>[]
}
