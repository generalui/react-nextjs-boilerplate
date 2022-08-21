import { z } from 'zod'

export type CSVParsed = Record<string, unknown>[]

export const UploadCSVSchema = z.object({
	csvFile: z.array(z.any())
})

export type UploadCSVInput = z.infer<typeof UploadCSVSchema>
