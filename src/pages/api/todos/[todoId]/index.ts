import type { NextApiRequest, NextApiResponse } from 'next'
import { todoIncludes } from 'src/pages/api/todos/utils'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { TodoInput } from 'types/index'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleAvatarJoin } from 'utils/api/handleAvatarJoin'
import { handleDocumentationJoin } from 'utils/api/handleDocumentationJoin'
import { handleQuery } from 'utils/api/handleQuery'
import { multer } from 'utils/api/multer'
import { prisma } from 'utils/api/prisma'
import { getCombinedString } from 'utils/client/text'

export { config } from 'utils/api/multer'

const apiRoute = connect()

// Middleware processing FormData to file
apiRoute.use(multer.fields([{ name: 'image', maxCount: 1 }, { name: 'documentation' }]))

// Get a todo by ID
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	// TODO: validate that the user is authorized to view this todo
	const { todoId } = req.query

	const todoQuery = async () =>
		await prisma.todo.findUnique({
			where: {
				id: todoId as string
			},
			...todoIncludes
		})

	handleQuery({
		req,
		res,
		model: 'todo',
		role: 'general',
		query: todoQuery
	})
})

const getEndDate = (endDate: string) => {
	const [year, month, day] = endDate.split('-').map((datePart) => parseInt(datePart, 10))

	return new Date(year, month - 1, day)
}

// Update todo by ID
apiRoute.patch(async (req: ApiRequestWithFile, res: NextApiResponse) => {
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

	const withEndDate = endDate ? { endDate: getEndDate(endDate) } : undefined

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

	const todoQuery = async () => {
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
			...todoIncludes
		})
	}

	handleQuery({
		req,
		res,
		model: 'todo',
		role: 'admin',
		query: todoQuery
	})
})

export default apiRoute
