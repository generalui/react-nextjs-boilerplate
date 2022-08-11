import { get } from 'lodash-es'
import { XMLParsed } from 'types/Xml'

export const getFromParsedXML = (
	parsedXML: XMLParsed,
	path: string,
	errorString = 'Invalid XML'
) => {
	const value = get(parsedXML, path)

	if (!value) throw new Error(errorString)

	return value
}
