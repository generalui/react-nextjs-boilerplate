import { createTodo } from 'models/Todos/mutation/createTodo'
import { getTodos } from 'models/Todos/query/getTodos'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { ApiTodosServerResponse } from 'types/Todo'
import { Todo } from 'types/index'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { multer } from 'utils/api/multer'

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
	handleQuery<ApiTodosServerResponse>({
		req,
		res,
		model: 'todo',
		role: 'admin',
		query: getTodos(req),
		disableLog: true
	})
})

// Create a new todo
apiRoute.post(async (req: ApiRequestWithFile, res: NextApiResponse) => {
	handleQuery<Todo>({
		req,
		res,
		model: 'todo',
		role: 'admin',
		query: createTodo(req)
	})
})

export default apiRoute
