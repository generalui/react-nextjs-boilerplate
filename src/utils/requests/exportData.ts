import { axios } from 'utils/client/axios'
// import { parseJsonToCSV } from 'utils/parseJsonToCSV'
import { ExportSchemaInput } from 'pages/ExportData/ExportData.types'

export const exportCSV = async (schemaToExport?: ExportSchemaInput) => {
	if (!schemaToExport) return null

	const response = await axios.get(`/export-data`, {
		params: {
			schemaToExport: schemaToExport.schema.value,
			schemaLabel: schemaToExport.schema.label
		}
	})

	const { csv, filename } = response.data[0]

	const url = window.URL.createObjectURL(new Blob([csv]))
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('download', filename)
	document.body.appendChild(link)
	link.click()
	link.remove()

	return response.data
}
