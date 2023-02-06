import { includeImage } from 'models/Users/includes'
import { prisma } from 'utils/api/prisma'

export const getUsers = async () =>
	await prisma.user.findMany({
		orderBy: [
			{
				name: 'asc'
			}
		],
		...includeImage
	})
