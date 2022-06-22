import { z } from 'zod'

export const UserSchema = z.object({
	name: z.string().trim()
})

export type UserInput = z.infer<typeof UserSchema>
