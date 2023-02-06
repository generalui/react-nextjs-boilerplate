import { addParticipantsToTodo } from 'models/Todos/mutation/addParticipantsToTodo'
import type { NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'

const apiRoute = connect()

// Bulk upload participants to todo
apiRoute.put(async (req: ApiRequestWithFile, res: NextApiResponse) => {
	handleQuery({
		req,
		res,
		model: 'todo',
		role: 'admin',
		query: addParticipantsToTodo(req)
	})
})

export default apiRoute
