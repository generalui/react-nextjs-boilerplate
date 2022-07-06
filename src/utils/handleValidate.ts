import { ValidationErrors } from 'final-form'
import { ZodSchema, z } from 'zod'

type HandleValidate = <T>(
	values: T,
	schema: ZodSchema
) => ValidationErrors | Promise<ValidationErrors> | undefined

export const handleValidate: HandleValidate = (values, schema) => {
	try {
		schema.parse(values)
	} catch (errors) {
		// If form validation error
		if (errors instanceof z.ZodError) {
			// Return single object where the key is equal to the zod path, and the value is the error message
			const returnErrors = errors.issues.reduce(
				(e: Record<string, unknown> | undefined, error: z.ZodIssue) => {
					const ret = { ...(e || {}) }
					error?.path?.forEach((p) => {
						ret[p] = error.message
					})

					return ret
				},
				undefined
			)
			return returnErrors
		}
	}
}
