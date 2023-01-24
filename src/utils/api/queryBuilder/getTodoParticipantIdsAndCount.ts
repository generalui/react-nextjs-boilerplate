import { Participant } from '@prisma/client'
import { GetTodoParticipantIdsAndCount } from 'types/ParticipantQueryBuilder'
import { ParticipantQueryBuilderTodoPayload } from 'types/Todo'

export const getTodoParticipantIdsAndCount: GetTodoParticipantIdsAndCount = (
	todosAnd,
	todosOr = []
) => {
	const todoSet = new Set<string>()
	let todoCount = 0
	let participantIdsA = [] as Participant['id'][]
	let participantIdsB = [] as Participant['id'][]

	const incrementCount = (todo: ParticipantQueryBuilderTodoPayload) => {
		if (!todoSet.has(todo.id)) {
			if (todo.participants.length > 0) todoCount++
			todoSet.add(todo.id)
		}
	}

	const incrementParticipantIds = (
		currentList: Participant['id'][],
		todo: ParticipantQueryBuilderTodoPayload
	) => [...new Set([...currentList, ...todo.participants.map((p) => p.participant.id)])]

	// If no todos return empty state
	if (!todosAnd.length && !todosOr?.length) return [0, [], []]
	else {
		for (const todo of todosAnd) {
			incrementCount(todo)

			// Map participants from join table and add to running list
			participantIdsA = incrementParticipantIds(participantIdsA, todo)
		}

		for (const todo of todosOr) {
			incrementCount(todo)

			participantIdsB = incrementParticipantIds(participantIdsB, todo)
		}
	}

	return [todoCount, participantIdsA, participantIdsB]
}
