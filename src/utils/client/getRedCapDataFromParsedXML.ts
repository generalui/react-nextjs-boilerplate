import { XMLParsed } from 'types/Xml'
import { getFromParsedXML } from 'utils/client/getFromParsedXML'

const REDCAP_CLIENT_DATA_KEY = 'ODM.ClinicalData[0].SubjectData'
const REDCAP_FORM_DATA_KEY = 'FormData[0].ItemGroupData'
const REDCAP_META_DATA_KEY = '$'
const REDCAP_ITEM_DATA_KEY = 'ItemData'

const parseItemGroupData = (redcapParsedClient: XMLParsed, baseErrorString: string) => {
	baseErrorString = `${baseErrorString} ${REDCAP_FORM_DATA_KEY}`

	const itemGroupData = getFromParsedXML(
		redcapParsedClient,
		REDCAP_FORM_DATA_KEY,
		baseErrorString
	) as XMLParsed[]

	const itemGroupDataTransformed = itemGroupData.map((itemGroup) => ({
		meta: getFromParsedXML(
			itemGroup,
			REDCAP_META_DATA_KEY,
			`${baseErrorString}.${REDCAP_META_DATA_KEY}`
		),
		values: (
			getFromParsedXML(
				itemGroup,
				REDCAP_ITEM_DATA_KEY,
				`${baseErrorString}.${REDCAP_ITEM_DATA_KEY}`
			) as XMLParsed[]
		).map((xmlItem, i) => {
			const errorString = `${baseErrorString}.${REDCAP_ITEM_DATA_KEY}[${i}]${REDCAP_META_DATA_KEY}`
			const xmlItemParsed = getFromParsedXML(
				xmlItem,
				REDCAP_META_DATA_KEY,
				errorString
			) as XMLParsed
			return {
				name: getFromParsedXML(xmlItemParsed, 'ItemOID', `${errorString}.ItemOID`),
				value: getFromParsedXML(xmlItemParsed, 'Value', `${errorString}.Value`)
			}
		})
	}))

	return {
		meta: {
			itemGroupCount: itemGroupDataTransformed.length,
			itemCount: itemGroupDataTransformed.reduce((last, current) => last + current.values.length, 0)
		},
		itemGroups: itemGroupDataTransformed
	}
}

export const getRedCapDataFromParsedXML = async (parsedXML: XMLParsed) => {
	const baseErrorString = `Invalid RedCap XML; must contain ${REDCAP_CLIENT_DATA_KEY}`
	const clientData = getFromParsedXML(parsedXML, REDCAP_CLIENT_DATA_KEY, baseErrorString)

	const clientDataTransformed = (clientData as XMLParsed[]).map((redcapParsedClient) => ({
		meta: redcapParsedClient['$'],
		responseData: parseItemGroupData(redcapParsedClient, baseErrorString)
	}))

	return clientDataTransformed
}
