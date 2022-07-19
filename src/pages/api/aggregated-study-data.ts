import type { NextApiRequest, NextApiResponse } from 'next'
import { AggregatedStudyData } from 'types/AggregatedStudyData'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

// Get a aggregated study data
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const studyQuery = async () => {
		const [totalStudies, totalDocuments] = await prisma.$transaction([
			prisma.study.count(),
			prisma.document.aggregate({
				_count: {
					studyId: true
				}
			})
		])

		// TODO: get data vault elements
		const totalDataVaultElements = 0

		return {
			totalStudies,
			totalDataVaultElements,
			totalDocuments: totalDocuments._count.studyId
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
