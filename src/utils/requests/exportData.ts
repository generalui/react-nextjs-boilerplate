import { parse } from 'json2csv'
import { axios } from 'utils/client/axios'
import { ExportSchemaInput } from 'pages/ExportData/ExportData.types'

export const exportCSV = async (schemaToExport?: ExportSchemaInput) => {
	if (!schemaToExport) return null

	const response = await axios.get(`/export-data`, {
		params: { schemaToExport: schemaToExport.schema.value }
	})
	if (response.data) {
		const csv = parse(response.data)
		console.log('🚀 ~ csv', csv)
	}

	return response.data
}
