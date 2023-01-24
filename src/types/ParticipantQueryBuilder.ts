import { Participant } from '@prisma/client'
import { WhereStatement } from 'types/QueryBuilder'
import { ParticipantQueryBuilderTodoPayload } from 'types/Todo'
import { getSingleWhere } from 'utils/api/queryBuilder'

export type ParticipantQueryReturn = {
	modelCount: number
	list: Participant[]
	todoCount: number
}

export type GetParticipantsReturnType = Promise<ParticipantQueryReturn>

export type GetParticipants = (
	where?: ReturnType<typeof getSingleWhere>
) => GetParticipantsReturnType

export type ParticipantsAndCount = [number, Participant['id'][], Participant['id'][]]

export type GetTodoParticipantIdsAndCount = (
	todosAnd: ParticipantQueryBuilderTodoPayload[],
	todosOr?: ParticipantQueryBuilderTodoPayload[]
) => ParticipantsAndCount

export type GetParticipantsViaTodo = (
	todoWhere: { where?: WhereStatement },
	participantWhere: { where?: WhereStatement }
) => GetParticipantsReturnType
