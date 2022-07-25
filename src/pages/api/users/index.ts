// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

// Get a list of users
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const usersQuery = async () =>
		await prisma.user.findMany({
			orderBy: [
				{
					name: 'asc'
				}
			],
			include: {
				image: {
					include: {
						image: true
					}
				}
			}
		})

	handleQuery({
		req,
		res,
		model: 'users',
		query: usersQuery,
		disableLog: true
	})
})

export default apiRoute
