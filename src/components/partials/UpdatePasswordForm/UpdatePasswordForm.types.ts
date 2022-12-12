import { CommonProps } from 'types/CommonProps'
import { z } from 'zod'

export interface UpdatePasswordFormProps extends CommonProps {}

export const NewPasswordSchema = z
	.object({
		newPassword: z
			.string()
			.min(8)
			.regex(/[A-Z]/, { message: 'String must contain at least 1 uppercase character' })
			.regex(/[a-z]/, { message: 'String must contain at least 1 lowercase character' })
			.regex(/\d/, { message: 'String must contain at least 1 digit' })
			.regex(/\W/, { message: 'String must contain at least 1 special character' }),

		newPasswordConfirmation: z.string().min(8)
	})
	.refine((data) => data.newPassword === data.newPasswordConfirmation, {
		message: 'Passwords do not match',
		path: ['newPasswordConfirmation']
	})

export type NewPasswordInput = z.infer<typeof NewPasswordSchema>
