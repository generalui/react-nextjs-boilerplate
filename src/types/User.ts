import { z } from 'zod'

export const UserSchema = z.object({
	name: z.string().trim(),
	email: z.string().email().trim()
})

export type UserInput = z.infer<typeof UserSchema>
