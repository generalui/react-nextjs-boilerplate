import type { NextApiRequest, NextApiResponse } from 'next'
import { AggregatedStudyData } from 'types/AggregatedStudyData'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

// Get a aggregated study data
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const studyQuery = async () => {
		const [totalStudies, totalDataVaultElements, totalDocuments] = await prisma.$transaction([
			prisma.study.count({
				where: {
					NOT: { status: 'archived' }
				}
			}),
			prisma.document.aggregate({
				_count: {
					_all: true
				},
				where: {
					NOT: { dataVault: null }
				}
			}),
			prisma.document.aggregate({
				_count: {
					studyId: true
				},
				where: {
					dataVault: null
				}
			})
		])

		return {
			totalStudies,
			totalDataVaultElements: totalDataVaultElements._count._all,
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
