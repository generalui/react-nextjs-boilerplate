import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'
import { ExportSchemaInput } from 'pages/ExportData/ExportData.types'

const apiRoute = connect()

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)

	const { schemaToExport } = req.query as { schemaToExport: ExportSchemaInput['schema']['value'] }
	console.log('🚀 ~ schemaToExport', schemaToExport)
	const getDataFromSchema = async () => {
		const data = await prisma[schemaToExport].findMany()
		// console.log('🚀 ~ data', data)
		// const parsedData = parse(data)
		// console.log('🚀 ~ parsedData', parsedData)
		return data
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
