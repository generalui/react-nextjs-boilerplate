import { XMLParsed } from 'types/Xml'
import { z } from 'zod'
import { BaseFormProps } from 'partials/Form/Form.types'

export const MapRedcapFieldsSchema = z.object({
	xmlFile: z.array(z.any())
})

export type MapRedcapFieldsInput = z.infer<typeof MapRedcapFieldsSchema>

export interface MapRedcapFieldsProps extends BaseFormProps<MapRedcapFieldsInput> {
	parsedXML?: XMLParsed
}
