import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'
import { parseJsonToCSV } from 'utils/parseJsonToCSV'
import { ExportSchemaInput } from 'pages/ExportData/ExportData.types'

const apiRoute = connect()

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)

	const { schemaToExport } = req.query as { schemaToExport: ExportSchemaInput['schema']['value'] }
	console.log('🚀 ~ schemaToExport', schemaToExport)
	const getDataFromSchema = async () => {
		const data = await prisma[schemaToExport].findMany()
		const csv = parseJsonToCSV(data)
		console.log('🚀 ~ csv', csv)
		return [csv]
	}

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
