import { Prisma } from '@prisma/client'

type UserIncludes = { include: Prisma.UserInclude }

export const includeImage: UserIncludes = {
	include: {
		image: {
			include: {
				image: true
			}
		}
	}
}

export const currentUserIncludes = {
	include: {
		image: {
			include: {
				image: true
			}
		},
		participant: {
			include: {
				user: true
			}
		}
	}
}
