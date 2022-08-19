import { useEffect, useState } from 'react'
import { XMLParsed } from 'types/index'
import { parseStringPromise } from 'xml2js'
import { getRedCapDataFromParsedXML } from 'utils/client/getRedCapDataFromParsedXML'

type UseXMLParserReturn = {
	parse: (xmlFile?: File) => void
	parsedXML?: XMLParsed
	isSuccess?: boolean
	isParsing?: boolean
	isError?: boolean
	isComplete?: boolean
	error?: Error
}

type XMLField = {
	name: string
	value?: string
	meta?: {
		key: string
	}
}

type UseXMLParserProps = {
	format?: 'redcap' | 'qualtrics'
	onComplete?: (parsedXML?: XMLParsed) => void
}

type UseXMLParser = (props?: UseXMLParserProps) => UseXMLParserReturn

const parseXML = async (xmlFile: File): Promise<XMLParsed> => {
	const xmlText = await xmlFile.text()
	const xmlParsed = await parseStringPromise(xmlText)

	if (!xmlParsed) throw new Error('XML failed to parse. Is this a valid XML file?')
	return xmlParsed
}

const parseXMLError = (error?: Error): XMLParsed => {
	return {
		isError: true,
		message: error?.message || 'XML file failed to parse'
	}
}

export const useXMLParser: UseXMLParser = (props = {}) => {
	const { format = 'redcap', onComplete } = props
	const [parsedXML, setParsedXML] = useState<XMLParsed>()
	const [isError, setIsError] = useState<boolean>()
	const [error, setError] = useState<Error>()
	const [isSuccess, setIsSuccess] = useState<boolean>()
	const [isParsing, setIsParsing] = useState<boolean>()
	const [isComplete, setIsComplete] = useState<boolean>(false)

	const handleXML = async (xmlFile?: File) => {
		try {
			setIsParsing(true)
			if (xmlFile) {
				const parsedXML = await parseXML(xmlFile)
				let clientData

				switch (format) {
					case 'redcap':
						clientData = await getRedCapDataFromParsedXML(parsedXML)
						setParsedXML(clientData)
						break
					default:
						throw Error('Invalid parsing format provided')
				}

				setIsError(false)
				setIsSuccess(true)
			}
		} catch (error) {
			setParsedXML(parseXMLError(error as Error))
			setError(error as Error)
			setIsError(true)
			setIsSuccess(false)
		} finally {
			setIsParsing(false)
			setIsComplete(true)
		}
	}

	useEffect(() => {
		if (isComplete && !isError && isSuccess && parsedXML) {
			onComplete?.(parsedXML)
		}
	}, [parsedXML, isError, isSuccess, isParsing, isComplete, onComplete])

	return { parsedXML, parse: handleXML, isError, isSuccess, isParsing, isComplete, error }
}
