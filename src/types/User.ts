import { Prisma } from '@prisma/client'
import { z } from 'zod'

export const UserSchema = z.object({
	name: z.string().trim().min(2),
	image: z.any().optional()
})

export type UserInput = z.infer<typeof UserSchema>

export type User = Prisma.UserGetPayload<{
	include: {
		image: {
			include: {
				image: true
			}
		}
		participant: {
			include: {
				user: true
			}
		}
	}
}>
