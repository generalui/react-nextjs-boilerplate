// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getParticipantTodos } from 'models/Todos/query/getParticipantTodos'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiTodosServerResponse } from 'types/Todo'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'

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
	handleQuery<ApiTodosServerResponse>({
		req,
		res,
		model: 'todo',
		query: getParticipantTodos(req),
		role: 'participant',
		disableLog: true
	})
})

export default apiRoute
