import { z } from 'zod'

export const UploadXmlSchema = z.object({
	xmlFile: z.array(z.any())
})

export type State = {
	xmlFile?: File
	result2?: string
}

export type UploadXmlInput = z.infer<typeof UploadXmlSchema>
