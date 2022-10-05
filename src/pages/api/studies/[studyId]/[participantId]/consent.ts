import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { studyId, participantId } = req.query
	const where = {
		studyId_participantId: {
			studyId: studyId as string,
			participantId: participantId as string
		}
	}

	const consentQuery = async () => {
		const consentQueryResult = await prisma.participantsOnStudies.findUnique({
			where,
			include: {
				consent: true
			}
		})

		return consentQueryResult?.consent
	}

	handleQuery({
		req,
		res,
		model: 'consent',
		role: 'general',
		query: consentQuery
	})
})

export default apiRoute
