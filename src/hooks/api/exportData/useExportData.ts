import { useMutation } from 'react-query'
import { exportCSV } from 'utils/requests/exportData'
import { ExportSchemaInput } from 'pages/ExportData/ExportData.types'

// type ExportData = Pick<ExportDataInput['data'], 'value'>
export const useExportData = () => {
	const { mutate } = useMutation(['export-data'], (schemaToExport?: ExportSchemaInput) =>
		exportCSV(schemaToExport)
	)

	return { mutate }
}
