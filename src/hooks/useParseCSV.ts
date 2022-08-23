import { useEffect, useState } from 'react'
import { CSVParsed } from 'types/index'
import { csv } from 'utils/client/csvtojson'

type UseCSVParserReturn = {
	parse: (xmlFile?: File) => void
	parsedCSV?: CSVParsed
	fields?: string[]
	isSuccess?: boolean
	isParsing?: boolean
	isError?: boolean
	isComplete?: boolean
	error?: Error
}

type UseCSVParserProps = {
	format?: 'csv' | 'qualtrics'
	onComplete?: (parsedCSV?: CSVParsed) => void
}

type UseCSVParser = (props?: UseCSVParserProps) => UseCSVParserReturn

const parseCSV = async (csvFile: File): Promise<CSVParsed> => {
	const csvText = await csvFile.text()
	const csvParsed = await csv.fromString(csvText)

	if (!csvParsed) throw new Error('CSV failed to parse. Is this a valid CSV file?')
	return csvParsed
}

const parseCSVError = (error?: Error): CSVParsed => {
	return [
		{
			isError: true,
			message: error?.message || 'CSV file failed to parse'
		}
	]
}

export const useParseCSV: UseCSVParser = (props = {}) => {
	const { format = 'csv', onComplete } = props
	const [parsedCSV, setParsedCSV] = useState<CSVParsed>()
	const [isError, setIsError] = useState<boolean>()
	const [error, setError] = useState<Error>()
	const [isSuccess, setIsSuccess] = useState<boolean>()
	const [isParsing, setIsParsing] = useState<boolean>()
	const [isComplete, setIsComplete] = useState<boolean>(false)
	const [fields, setFields] = useState<string[]>()

	const handleCSV = async (csvFile?: File) => {
		try {
			setIsParsing(true)
			if (csvFile) {
				const parsedCSV = await parseCSV(csvFile)
				console.log('handleCSV ~ parsedCSV', parsedCSV)
				// let clientData

				switch (format) {
					case 'csv':
						setParsedCSV(parsedCSV)
						break
					default:
						throw Error('Invalid parsing format provided')
				}

				setIsError(false)
				setIsSuccess(true)
			}
		} catch (error) {
			setParsedCSV(parseCSVError(error as Error))
			setError(error as Error)
			setIsError(true)
			setIsSuccess(false)
		} finally {
			setIsParsing(false)
			setIsComplete(true)
		}
	}

	useEffect(() => {
		if (isComplete && !isError && isSuccess && parsedCSV) {
			onComplete?.(parsedCSV)
		}
	}, [parsedCSV, isError, isSuccess, isParsing, isComplete, onComplete])

	useEffect(() => {
		if (parsedCSV && parsedCSV.length > 0) setFields(Object.keys(parsedCSV[0]))
	}, [parsedCSV, setFields])

	return {
		parsedCSV,
		fields,
		parse: handleCSV,
		isError,
		isSuccess,
		isParsing,
		isComplete,
		error
	}
}
