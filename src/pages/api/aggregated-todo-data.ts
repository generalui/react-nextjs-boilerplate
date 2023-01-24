import type { NextApiRequest, NextApiResponse } from 'next'
import { AggregatedTodoData } from 'types/AggregatedTodoData'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

// Get a aggregated todo data
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const todoQuery = async () => {
		const [totalTodos, totalDocuments] = await prisma.$transaction([
			prisma.todo.count({
				where: {
					NOT: { status: 'archived' }
				}
			}),
			prisma.document.aggregate({
				_count: {
					todoId: true
				},
				where: {}
			})
		])

		return {
			totalTodos,
			totalDocuments: totalDocuments._count.todoId
		}
	}

	handleQuery<AggregatedTodoData>({
		req,
		res,
		model: 'todo',
		query: todoQuery,
		role: 'admin',
		disableLog: true
	})
})

export default apiRoute
