import { updateCurrentUser } from 'models/Users/mutation/updateCurrentUser'
import { getCurrentUser } from 'models/Users/query/getCurrentUser'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { User } from 'types/User'
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
apiRoute.use(multer.single('image'))

// GET USER
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	handleQuery<User>({
		req,
		res,
		model: 'currentUser',
		disableLog: true,
		role: 'general',
		query: getCurrentUser(req)
	})
})

// UPDATE USER
apiRoute.patch(async (req: ApiRequestWithFile, res: NextApiResponse) => {
	handleQuery<User>({
		req,
		res,
		model: 'currentUser',
		role: 'general',
		query: updateCurrentUser(req)
	})
})

export default apiRoute
