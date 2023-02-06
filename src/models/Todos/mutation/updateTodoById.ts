import { todoIncludesDefault } from 'models/Todos/includes'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { TodoInput } from 'types/index'
import { getEndDateFromString } from 'utils/api/getEndDateFromString'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleAvatarJoin } from 'utils/api/handleAvatarJoin'
import { handleDocumentationJoin } from 'utils/api/handleDocumentationJoin'
import { prisma } from 'utils/api/prisma'
import { getCombinedString } from 'utils/client/text'

export const updateTodoById = (req: ApiRequestWithFile) => {
	return async () => {
		if (!req.query.todoId) {
			throw new Error('Update must include an id')
		}

		// TODO: validate that the user is authorized to update this todo
		const todoId = getCombinedString(req.query.todoId)
		const session = await getSessionFromReq(req)
		const { userId } = session

		// Extract body values that need transformation
		const { endDate, coordinator, dataTypes, ...simpleBody } = req.body as Omit<
			TodoInput,
			'coordinator' | 'dataTypes'
		> & {
			coordinator?: string
			dataTypes: string
		}

		// TODO: this needs include an update to the todo users, it should be possible to update the coordinators on a todo
		// Remove values that don't belong in the database
		const withCoordinator = coordinator
			? { users: { create: { user: { connect: { id: coordinator } } } } }
			: undefined

		const withImage = await handleAvatarJoin(req.files?.image?.[0], userId)

		const withDocumentation = await handleDocumentationJoin(req.files?.documentation, userId)

		const withEndDate = endDate ? { endDate: getEndDateFromString(endDate) } : undefined

		// TODO: there should be a better way to manage arrays of strings coming from the client
		const withDataTypes = dataTypes ? { dataTypes: JSON.parse(dataTypes) } : undefined

		const data = {
			...simpleBody,
			...withDataTypes,
			...withEndDate,
			...withDocumentation,
			...withImage,
			...withCoordinator
		}

		if (withCoordinator) {
			// The current functionality of the app is that there is only one coordinator per todo.
			// So we must remove the others before updating the todo.
			await prisma.coordinatorsOnTodos.deleteMany({
				where: {
					todoId: todoId
				}
			})
		}

		return await prisma.todo.update({
			where: {
				id: todoId
			},
			data,
			...todoIncludesDefault
		})
	}
}
