import { z } from 'zod'

/**
 * Login password requirements
 *
 * It should contain both upper and lower case characters (e.g., a-z, A-Z);
 * It should contain digits (numbers) and other non-letter characters such as !@#$%^&*()_+|~-=\'{}[]:";<>?,./;
 * It should be at least 8 characters long;
 * It should not be a word in any language, slang, dialect, jargon, etc.; and
 * It should not be easily ascertained from the research of publicly available information, such as names of family members, school names, addresses, etc.
 *
 * reference: https://www.loginradius.com/blog/engineering/password-security-best-practices-compliance/#2-hipaa-health-insurance-portability-and-accountability-act
 */
export const passwordValidator = z
	.string()
	.regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])\S{8,32}$/)

export const SignInSchema = z.object({
	email: z.string().email(),
	password: passwordValidator
})

export type SignInInput = z.infer<typeof SignInSchema>

export const CreateAccountSchema = z
	.object({
		email: z.string().email(),
		password: passwordValidator,
		confirm: passwordValidator
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords don't match",
		path: ['confirm'] // path of error
	})

export type CreateAccountInput = z.infer<typeof CreateAccountSchema>
