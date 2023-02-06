import { NextApiRequest } from 'next'
import { prisma } from 'utils/api/prisma'

// TODO: update args to take user and password with appropriate types
export const updateUserPassword = (req: NextApiRequest) => {
	return async () => {
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
}
