import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleQuery } from 'utils/api/handleQuery'
import { parseJsonToCSV } from 'utils/api/parseJsonToCSV'
import { prisma } from 'utils/api/prisma'
import { exportDataInclude } from 'utils/includes/exportDataIncludes'
import { ExportSchemaInput } from 'pages/ExportData/ExportData.types'

const apiRoute = connect()

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)

	const { schemaToExport } = req.query as { schemaToExport: ExportSchemaInput['schema']['value'] }
	const getDataFromSchema = async () => {
		const data = await prisma[schemaToExport].findMany(exportDataInclude[schemaToExport])
		const csv = parseJsonToCSV(data)
		return [csv]
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
