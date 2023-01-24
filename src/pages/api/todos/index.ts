// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TodoStatus } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { ApiTodosServerResponse, TodoInput } from 'types/Todo'
import { Todo } from 'types/index'
import { connect } from 'utils/api/connect'
import { getPaginationFromReq } from 'utils/api/getPaginationFromReq'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleAvatarJoin } from 'utils/api/handleAvatarJoin'
import { handleDocumentationJoin } from 'utils/api/handleDocumentationJoin'
import { handleQuery } from 'utils/api/handleQuery'
import { multer } from 'utils/api/multer'
import { prisma } from 'utils/api/prisma'
import { todoIncludes } from './utils'

export { config } from 'utils/api/multer'

/**
 * Api setup for uploading documents
 *
 * Reference tutorial: https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
 * Multer reference: https://github.com/expressjs/multer#readme
 */
const apiRoute = connect()

// Middleware processing FormData to file
apiRoute.use(
	multer.fields([
		{ name: 'image', maxCount: 1 },
		{ name: 'documentation', maxCount: 20 }
	])
)

// Get a list of todos
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const page = getPaginationFromReq(req)

	const todosQuery = async () => {
		const [count, todos] = await prisma.$transaction([
			prisma.todo.count({}),
			prisma.todo.findMany({
				orderBy: [
					{
						submissionDate: 'desc'
					}
				],
				...todoIncludes,
				...page
			})
		])

		return { count, hasMore: page.skip + page.take < count, todos: todos as Todo[] }
	}
	handleQuery<ApiTodosServerResponse>({
		req,
		res,
		model: 'todo',
		role: 'admin',
		query: todosQuery,
		disableLog: true
	})
})

// Create a new todo
apiRoute.post(async (req: ApiRequestWithFile, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)

	const todoQuery = async () => {
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
			...todoIncludes
		})) as Todo
	}

	handleQuery<Todo>({
		req,
		res,
		session,
		model: 'todo',
		role: 'admin',
		query: todoQuery
	})
})

export default apiRoute
