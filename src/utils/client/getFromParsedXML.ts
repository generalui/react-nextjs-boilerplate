import { get } from 'lodash'
// TODO: lodash-es doesn't work in test
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
