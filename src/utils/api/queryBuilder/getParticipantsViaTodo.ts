import { GetParticipantsViaTodo } from 'types/ParticipantQueryBuilder'
import { WhereStatementWithFilterType } from 'types/QueryBuilder'
import { ParticipantQueryBuilderTodoPayload } from 'types/Todo'
import { prisma } from 'utils/api/prisma'
import { getTodoParticipantIdsAndCount } from 'utils/api/queryBuilder/getTodoParticipantIdsAndCount'
import { participantQueryInclude } from 'utils/includes/participantIncludes'
import { todoSelectParticipantIds } from 'utils/includes/todoIncludes'

export const getParticipantsViaTodo: GetParticipantsViaTodo = async (
	todoWhere,
	participantWhere
) => {
	if (!todoWhere.where) return { modelCount: 0, list: [], todoCount: 0 }
	let participantViaTodoWhere: WhereStatementWithFilterType = { OR: [], AND: [] }
	if (
		participantWhere.where &&
		('OR' in participantWhere.where || 'AND' in participantWhere.where)
	) {
		participantViaTodoWhere = participantWhere.where
	} else if (participantWhere.where) {
		participantViaTodoWhere = {
			OR: [participantWhere.where],
			AND: []
		}
	} else {
		participantViaTodoWhere = { OR: [], AND: [] }
	}

	let todoCount = 0

	if ('AND' in todoWhere || 'OR' in todoWhere) {
		const [todosAND, todosOR] = await prisma.$transaction([
			prisma.todo.findMany({
				...todoWhere,
				...todoSelectParticipantIds
			}),
			prisma.todo.findMany({
				...todoWhere,
				...todoSelectParticipantIds
			})
		])
		const [count, todoParticipantANDIds, todoParticipantORIds] = getTodoParticipantIdsAndCount(
			todosAND as ParticipantQueryBuilderTodoPayload[],
			todosOR as ParticipantQueryBuilderTodoPayload[]
		)

		todoCount = count

		participantViaTodoWhere.AND = [
			...participantViaTodoWhere.AND,
			{ id: { in: todoParticipantANDIds } }
		]

		participantViaTodoWhere.OR = [
			...participantViaTodoWhere.OR,
			{ id: { in: todoParticipantORIds } }
		]
	} else {
		// Todo is the only filter
		const todos = await prisma.todo.findMany({
			...todoWhere,
			...todoSelectParticipantIds
		})

		const [count, participantIDs] = getTodoParticipantIdsAndCount(
			todos as ParticipantQueryBuilderTodoPayload[]
		)

		todoCount = count
		participantViaTodoWhere = {
			OR: [...participantViaTodoWhere.OR, { id: { in: participantIDs } }],
			AND: [...participantViaTodoWhere.AND]
		}
	}

	const participants = await prisma.participant.findMany({
		where: participantViaTodoWhere,
		...participantQueryInclude
	})

	return { modelCount: participants?.length || 0, list: participants || [], todoCount }
}
