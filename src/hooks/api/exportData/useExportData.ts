import { useMutation } from 'react-query'
import { toast } from 'utils/client/toast'
import { exportCSV } from 'utils/requests/exportData'
import { useText } from 'hooks/useText'
import { ExportSchemaInput } from 'pages/ExportData/ExportData.types'

export const useExportData = () => {
	const { t } = useText('exportData')

	const { mutate } = useMutation(
		['export-data'],
		(schemaToExport?: ExportSchemaInput) => exportCSV(schemaToExport),
		{
			onError: () => {
				toast(t('error'), 'error')
			}
		}
	)

	return { mutate }
}
