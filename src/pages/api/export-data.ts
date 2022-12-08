import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleQuery } from 'utils/api/handleQuery'
import { parseJsonToCSV } from 'utils/api/parseJsonToCSV'
import { prisma } from 'utils/api/prisma'
import { exportDataFindManyArgs } from 'utils/includes/exportDataFindManyArgs'
import { ExportSchemaInput } from 'pages/ExportData/ExportData.types'

const apiRoute = connect()

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)

	const { schemaToExport, schemaLabel } = req.query as {
		schemaToExport: ExportSchemaInput['schema']['value']
		schemaLabel: ExportSchemaInput['schema']['label']
	}
	const getDataFromSchema = async () => {
		const data = await prisma[schemaToExport].findMany(exportDataFindManyArgs[schemaToExport])
		const csv = parseJsonToCSV(data)

		const datetime = new Date()
			.toLocaleString()
			.replace(',', '')
			.replace(/:/g, '_')
			.replace(/ /g, '_')
		const filename = `${schemaLabel.toLocaleLowerCase()}_${datetime}.csv`
		return [{ csv, filename }]
	}

	await getDataFromSchema()

	handleQuery({
		req,
		res,
		model: schemaToExport,
		session,
		role: 'admin',
		query: getDataFromSchema
	})
})

export default apiRoute
