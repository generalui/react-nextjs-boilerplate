import { CommonProps } from 'types/CommonProps'
import { z } from 'zod'

export const ExportDataSchema = z.object({
	schema: z.object({
		value: z.union([z.literal('study'), z.literal('user')]),
		label: z.string()
	})
})

export type ExportSchemaInput = z.infer<typeof ExportDataSchema>
export type SchemaOptions = ExportSchemaInput['schema']['value']

export interface ExportDataProps extends CommonProps {}
