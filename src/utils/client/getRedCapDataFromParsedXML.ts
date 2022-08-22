import { XMLParsed } from 'types/Xml'
import { getFromParsedXML } from 'utils/client/getFromParsedXML'

const REDCAP_CLIENT_DATA_KEY = 'ODM.ClinicalData[0].SubjectData'
const REDCAP_STUDY_META_DATA_KEY = 'ODM.Study[0].MetaDataVersion'
const REDCAP_FORM_DATA_KEY = 'FormData[0].ItemGroupData'
const REDCAP_META_DATA_KEY = '$'
const REDCAP_ITEM_DATA_KEY = 'ItemData'

// const reduceItemGroups = (itemGroupData: XMLParsed[]) => {
// 	return itemGroupData.reduce((itemGroupsReduced: XMLParsed[], itemGroup: XMLParsed) => {
// 		const errorString = `${baseErrorString}.${REDCAP_ITEM_DATA_KEY}[${i}]${REDCAP_META_DATA_KEY}`
// 		const xmlItemParsed = getFromParsedXML(xmlItem, REDCAP_META_DATA_KEY, errorString) as XMLParsed
// 		return {
// 			name: getFromParsedXML(xmlItemParsed, 'ItemOID', `${errorString}.ItemOID`),
// 			value: getFromParsedXML(xmlItemParsed, 'Value', `${errorString}.Value`)
// 		}
// 		// return itemGroupsReduced.concat(itemGroup)
// 	}, [])
// }

const parseParticipantResponses = (redcapParsedClient: XMLParsed, baseErrorString: string) => {
	baseErrorString = `${baseErrorString} ${REDCAP_FORM_DATA_KEY}`

	const itemGroupData = getFromParsedXML(
		redcapParsedClient,
		REDCAP_FORM_DATA_KEY,
		baseErrorString
	) as XMLParsed[]

	const flattenedItemGroupData = itemGroupData.reduce(
		(flatItems: XMLParsed[], itemGroup: XMLParsed) => {
			const itemGroupValues = getFromParsedXML(
				itemGroup,
				REDCAP_ITEM_DATA_KEY,
				`${baseErrorString}.${REDCAP_ITEM_DATA_KEY}`
			) as XMLParsed[]

			if (!Array.isArray(itemGroupValues)) throw Error('itemGroupValues is not an array')

			const itemGroupValuesTransformed = itemGroupValues.map((xmlItem, i) => {
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

			return flatItems.concat(itemGroupValuesTransformed)
		},
		[]
	)

	// const itemGroupDataTransformed = itemGroupData.map((itemGroup) => ({
	// 	meta: getFromParsedXML(
	// 		itemGroup,
	// 		REDCAP_META_DATA_KEY,
	// 		`${baseErrorString}.${REDCAP_META_DATA_KEY}`
	// 	),
	// 	values: (
	// 		getFromParsedXML(
	// 			itemGroup,
	// 			REDCAP_ITEM_DATA_KEY,
	// 			`${baseErrorString}.${REDCAP_ITEM_DATA_KEY}`
	// 		) as XMLParsed[]
	// 	).map((xmlItem, i) => {
	// 		const errorString = `${baseErrorString}.${REDCAP_ITEM_DATA_KEY}[${i}]${REDCAP_META_DATA_KEY}`
	// 		const xmlItemParsed = getFromParsedXML(
	// 			xmlItem,
	// 			REDCAP_META_DATA_KEY,
	// 			errorString
	// 		) as XMLParsed
	// 		return {
	// 			name: getFromParsedXML(xmlItemParsed, 'ItemOID', `${errorString}.ItemOID`),
	// 			value: getFromParsedXML(xmlItemParsed, 'Value', `${errorString}.Value`)
	// 		}
	// 	})
	// }))

	return {
		fields: flattenedItemGroupData
		// meta: {
		// 	itemGroupCount: itemGroupDataTransformed.length,
		// 	itemCount: itemGroupDataTransformed.reduce((last, current) => last + current.values.length, 0)
		// },
		// itemGroups: itemGroupDataTransformed
	}
}

const getAndFlattenClientResponseData = (parsedXML: XMLParsed) => {
	const baseErrorString = `Invalid RedCap XML; must contain ${REDCAP_CLIENT_DATA_KEY}`
	const clientData = getFromParsedXML(parsedXML, REDCAP_CLIENT_DATA_KEY, baseErrorString)

	const clientDataTransformed = (clientData as XMLParsed[]).map((redcapParsedClient) => ({
		meta: redcapParsedClient['$'],
		responseData: parseParticipantResponses(redcapParsedClient, baseErrorString)
	}))

	return clientDataTransformed
}
const getFieldsFromParsedXML = (parsedXML: XMLParsed) => {
	console.log('getFieldsFromParsedXML ~ parsedXML', parsedXML)
	const baseErrorString = `Invalid RedCap XML; must contain ${REDCAP_STUDY_META_DATA_KEY}`

	// Get study metadata
	const metaDataVersions = getFromParsedXML(parsedXML, REDCAP_STUDY_META_DATA_KEY, baseErrorString)
	if (!Array.isArray(metaDataVersions)) throw new Error('metaDataVersions must be an array')

	console.log('getFieldsFromParsedXML ~ metaDataVersions', metaDataVersions)
	// Get last metadata version
	const lastMetaDataVersion = metaDataVersions.at(-1)
	console.log('getFieldsFromParsedXML ~ lastMetaDataVersion', lastMetaDataVersion)

	// Get item definitions from metaData
	const itemDefs = getFromParsedXML(
		lastMetaDataVersion,
		'ItemDef',
		`${baseErrorString}.ItemDef`
	) as XMLParsed[]

	const itemDefsTransformed = itemDefs.map((item) =>
		getFromParsedXML(item, '$.OID', `${baseErrorString}.$.OID`)
	)
	console.log('getFieldsFromParsedXML ~ itemDefsTransformed', itemDefsTransformed)
	return itemDefsTransformed
}

export const getRedCapDataFromParsedXML = async (parsedXML: XMLParsed) => {
	return {
		fields: getFieldsFromParsedXML(parsedXML),
		responses: getAndFlattenClientResponseData(parsedXML)
	}
}
