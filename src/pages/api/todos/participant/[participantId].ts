// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiTodosServerResponse } from 'types/Todo'
import { Todo } from 'types/index'
import { connect } from 'utils/api/connect'
import { getPaginationFromReq } from 'utils/api/getPaginationFromReq'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'
import { todoIncludes } from '../utils'

export { config } from 'utils/api/multer'

/**
 * Api setup for uploading documents
 *
 * Reference tutorial: https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
 * Multer reference: https://github.com/expressjs/multer#readme
 */
const apiRoute = connect()

// Get a list of todos
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { participantId } = req.query

	const page = getPaginationFromReq(req)

	const todosQuery = async () => {
		const [count, todos] = await prisma.$transaction([
			prisma.todo.count({}),
			prisma.todo.findMany({
				where: {
					participants: {
						some: {
							participantId: participantId as string
						}
					}
				},
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
		query: todosQuery,
		role: 'participant',
		disableLog: true
	})
})

export default apiRoute