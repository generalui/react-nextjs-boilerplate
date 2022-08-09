import { z } from 'zod'

export const UploadXmlSchema = z.object({
	xmlFile: z.any()
})

export type UploadXmlInput = z.infer<typeof UploadXmlSchema>
