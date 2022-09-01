// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiStudiesServerResponse } from 'types/Study'
import { Study } from 'types/index'
import { connect } from 'utils/api/connect'
import { getPaginationFromReq } from 'utils/api/getPaginationFromReq'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'
import { studyIncludes } from '../utils'

export { config } from 'utils/api/multer'

/**
 * Api setup for uploading documents
 *
 * Reference tutorial: https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
 * Multer reference: https://github.com/expressjs/multer#readme
 */
const apiRoute = connect()

// Get a list of studies
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { participantId } = req.query

	const page = getPaginationFromReq(req)

	const studiesQuery = async () => {
		const [count, studies] = await prisma.$transaction([
			prisma.study.count({}),
			prisma.study.findMany({
				where: {
					participants: {
						some: {
							participantId: participantId as string
						}
					}
				},
				...studyIncludes,
				...page
			})
		])

		return { count, hasMore: page.skip + page.take < count, studies: studies as Study[] }
	}
	handleQuery<ApiStudiesServerResponse>({
		req,
		res,
		model: 'study',
		query: studiesQuery,
		role: 'participant',
		disableLog: true
	})
})

export default apiRoute
