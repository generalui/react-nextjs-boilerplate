import { axios } from 'utils/client/axios'
// import { parseJsonToCSV } from 'utils/parseJsonToCSV'
import { ExportSchemaInput } from 'pages/ExportData/ExportData.types'

export const exportCSV = async (schemaToExport?: ExportSchemaInput) => {
	if (!schemaToExport) return null

	const response = await axios.get(`/export-data`, {
		params: { schemaToExport: schemaToExport.schema.value }
	})
	const url = window.URL.createObjectURL(new Blob([response.data[0]]))
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('download', 'data.csv')
	document.body.appendChild(link)
	link.click()

	return response.data
}
