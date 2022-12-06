import { CommonProps } from 'types/CommonProps'
import { z } from 'zod'

export const ExportDataSchema = z.object({
	data: z.object({
		value: z.string(),
		label: z.string()
	})
})

export type ExportDataInput = z.infer<typeof ExportDataSchema>

export interface ExportDataProps extends CommonProps {}
