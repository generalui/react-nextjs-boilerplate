import { todoIncludesDefault } from 'models/Todos/includes'
import { NextApiRequest } from 'next'
import { prisma } from 'utils/api/prisma'

export const getTodoById = (req: NextApiRequest) => {
	const { todoId } = req.query

	return async () =>
		await prisma.todo.findUnique({
			where: {
				id: todoId as string
			},
			...todoIncludesDefault
		})
}
