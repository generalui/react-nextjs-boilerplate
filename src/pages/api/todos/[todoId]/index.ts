import { updateTodoById } from 'models/Todos/mutation/updateTodoById'
import { getTodoById } from 'models/Todos/query/getTodoById'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { multer } from 'utils/api/multer'

export { config } from 'utils/api/multer'

const apiRoute = connect()

// Middleware processing FormData to file
apiRoute.use(multer.fields([{ name: 'image', maxCount: 1 }, { name: 'documentation' }]))

// Get a todo by ID
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	handleQuery({
		req,
		res,
		model: 'todo',
		role: 'general',
		query: getTodoById(req)
	})
})

// Update todo by ID
apiRoute.patch(async (req: ApiRequestWithFile, res: NextApiResponse) => {
	handleQuery({
		req,
		res,
		model: 'todo',
		role: 'admin',
		query: updateTodoById(req)
	})
})

export default apiRoute
