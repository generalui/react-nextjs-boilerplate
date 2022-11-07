import { Participant } from '@prisma/client'
import { WhereStatement } from 'types/QueryBuilder'
import { ParticipantQueryBuilderStudyPayload } from 'types/Study'
import { getSingleWhere } from 'utils/api/queryBuilder'

export type ParticipantQueryReturn = {
	modelCount: number
	list: Participant[]
	studyCount: number
}

export type GetParticipantsReturnType = Promise<ParticipantQueryReturn>

export type GetParticipants = (
	where?: ReturnType<typeof getSingleWhere>
) => GetParticipantsReturnType

export type ParticipantsAndCount = [number, Participant['id'][], Participant['id'][]]

export type GetStudyParticipantIdsAndCount = (
	studiesAnd: ParticipantQueryBuilderStudyPayload[],
	studiesOr?: ParticipantQueryBuilderStudyPayload[]
) => ParticipantsAndCount

export type GetParticipantsViaStudy = (
	studyWhere: { where?: WhereStatement },
	participantWhere: { where?: WhereStatement }
) => GetParticipantsReturnType
