import { useQuery } from 'react-query'
import { exportCSV } from 'utils/requests/exportData'
import { ExportSchemaInput } from 'pages/ExportData/ExportData.types'

// type ExportData = Pick<ExportDataInput['data'], 'value'>
export const useExportData = (schemaToExport?: ExportSchemaInput) => {
	const { data } = useQuery(
		['export-data', schemaToExport],
		() => exportCSV(schemaToExport),

		{
			keepPreviousData: true
		}
	)

	return { data }
}
