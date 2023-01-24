import { CommonProps } from 'types/CommonProps'
import { z } from 'zod'

export const ExportDataSchema = z.object({
	schema: z.object({
		value: z.union([
			z.literal('todo'),
			z.literal('user'),
			z.literal('participant'),
			z.literal('surveyResponse'),
			z.literal('eventLog')
		]),
		label: z.string()
	})
})

export type ExportSchemaInput = z.infer<typeof ExportDataSchema>
export type SchemaOptions = ExportSchemaInput['schema']['value']

export interface ExportDataProps extends CommonProps {}
