import { parse } from 'json2csv'

export const parseJsonToCSV = (data: unknown[]) => {
	const csv = parse(data)
	return csv
}
