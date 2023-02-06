import { Todo } from 'models/Todos/Todos.types'
import { todoIncludesDefault } from 'models/Todos/includes'
import { NextApiRequest } from 'next'
import { getPaginationFromReq } from 'utils/api/getPaginationFromReq'
import { prisma } from 'utils/api/prisma'

export const getTodos = (req: NextApiRequest) => {
	const page = getPaginationFromReq(req)

	return async () => {
		const [count, todos] = await prisma.$transaction([
			prisma.todo.count({}),
			prisma.todo.findMany({
				orderBy: [
					{
						submissionDate: 'desc'
					}
				],
				...todoIncludesDefault,
				...page
			})
		])

		return { count, hasMore: page.skip + page.take < count, todos: todos as Todo[] }
	}
}
