import type { NextApiRequest, NextApiResponse } from 'next'
import { AggregatedStudyData } from 'types/AggregatedStudyData'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

// Get a aggregated study data
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const studyQuery = async () => {
		const totalStudies = await prisma.study.count()

		// TODO: get data vault elements
		const totalDataVaultElements = 0

		// TODO: get document elements
		const totalDocuments = 0

		return {
			totalStudies,
			totalDataVaultElements,
			totalDocuments
		}
	}

	handleQuery<AggregatedStudyData>({
		req,
		res,
		model: 'study',
		query: studyQuery,
		disableLog: true
	})
})

export default apiRoute
