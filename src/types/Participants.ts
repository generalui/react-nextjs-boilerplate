import { Prisma } from '@prisma/client'
import {
	participantIncludesConsent,
	participantQueryInclude
} from 'utils/includes/participantIncludes'

export type SingleParticipantQueryResult = Prisma.ParticipantGetPayload<
	typeof participantQueryInclude
>

export type ParticipantWithConsent = Prisma.ParticipantGetPayload<typeof participantIncludesConsent>

export type ParticipantQueryResults = {
	modelCount: number
	studyCount?: number
	list: SingleParticipantQueryResult[]
}
