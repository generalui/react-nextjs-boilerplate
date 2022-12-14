// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
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
		role: 'admin',
		disableLog: true
	})
})

apiRoute.patch(async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)

	const updateUser = async () => {
		const { user, password } = req.body
		return await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				password: password
			}
		})
	}

	handleQuery({
		req,
		res,
		model: 'user',
		session,
		role: 'admin',
		query: updateUser
	})
})

export default apiRoute
