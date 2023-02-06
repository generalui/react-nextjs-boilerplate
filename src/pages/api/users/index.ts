// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { updateUserPassword } from 'models/Users/mutation/updateUserPassword'
import { getUsers } from 'models/Users/query/getUsers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'

const apiRoute = connect()

// Get a list of users
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	handleQuery({
		req,
		res,
		model: 'users',
		query: getUsers,
		role: 'admin',
		disableLog: true
	})
})

// TODO: create route that makes more sense for updating a user password (e.g. /api/users/[userId]/update-password)
apiRoute.patch(async (req: NextApiRequest, res: NextApiResponse) => {
	handleQuery({
		req,
		res,
		model: 'user',
		role: 'admin',
		query: updateUserPassword(req)
	})
})

export default apiRoute
