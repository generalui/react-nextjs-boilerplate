import { Prisma } from '@prisma/client'
import { participantQueryInclude } from 'utils/includes/participantIncludes'

export type SingleParticipantQueryResult = Prisma.ParticipantGetPayload<
	typeof participantQueryInclude
>

export type ParticipantQueryResults = {
	modelCount: number
	todoCount?: number
	list: SingleParticipantQueryResult[]
}
