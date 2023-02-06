import { prisma } from 'utils/api/prisma'

export const getAggregatedTodoData = async () => {
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
