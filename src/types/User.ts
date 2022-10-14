import { Prisma } from '@prisma/client'
import { UserRole } from '@prisma/client'
import { z } from 'zod'

export type Roles = keyof typeof UserRole | 'general'

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
