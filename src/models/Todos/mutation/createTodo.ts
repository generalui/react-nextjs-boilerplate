import { TodoStatus } from '@prisma/client'
import { Todo, TodoInput } from 'models/Todos/Todos.types'
import { todoIncludesDefault } from 'models/Todos/includes'
// import { TodoInput } from 'models/Todo'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleAvatarJoin } from 'utils/api/handleAvatarJoin'
import { handleDocumentationJoin } from 'utils/api/handleDocumentationJoin'
import { prisma } from 'utils/api/prisma'

export const createTodo = (req: ApiRequestWithFile) => {
	return async () => {
		const session = await getSessionFromReq(req)

		const { title, coordinator, endDate, description, dataTypes } = req.body as Omit<
			TodoInput,
			'dataTypes'
		> & { dataTypes: string }

		const insertDataTypes = dataTypes ? { dataTypes: JSON.parse(dataTypes) } : undefined

		const upsertImage = await handleAvatarJoin(req.files?.image?.[0], session.userId)
		const upsertDocumentation = await handleDocumentationJoin(
			req.files?.documentation,
			session.userId
		)

		const [year, month, day] = endDate.split('-').map((datePart) => parseInt(datePart, 10))

		return (await prisma.todo.create({
			data: {
				title,
				endDate: new Date(year, month - 1, day),
				description,
				status: TodoStatus.new,
				submissionDate: new Date(),
				users: {
					create: {
						user: {
							connect: {
								id: coordinator
							}
						}
					}
				},
				...insertDataTypes,
				...upsertDocumentation,
				...upsertImage
			},
			...todoIncludesDefault
		})) as Todo
	}
}
