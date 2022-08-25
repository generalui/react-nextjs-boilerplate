// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StudyStatus } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { ApiStudiesServerResponse, StudyInput } from 'types/Study'
import { AddParticipantsInput, Study } from 'types/index'
import { connect } from 'utils/api/connect'
import { getPaginationFromReq } from 'utils/api/getPaginationFromReq'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleAvatarJoin } from 'utils/api/handleAvatarJoin'
import { handleDocumentationJoin } from 'utils/api/handleDocumentationJoin'
import { handleQuery } from 'utils/api/handleQuery'
import { multer } from 'utils/api/multer'
import { prisma } from 'utils/api/prisma'

// export { config } from 'utils/api/multer'

/**
 * Api setup for uploading documents
 *
 * Reference tutorial: https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
 * Multer reference: https://github.com/expressjs/multer#readme
 */
const apiRoute = connect()

// Bulk upload participants to study
apiRoute.put(async (req: ApiRequestWithFile, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)
	console.log('addParticipantsToStudyQuery ~ session', session)

	const addParticipantsToStudyQuery = async () => {
		const { participants } = req.body as Omit<AddParticipantsInput, 'dataTypes'> & {
			dataTypes: string
		}

		console.log('addParticipantsToStudyQuery ~ participants', participants)
		// Create users

		// Add users to study

		// await prisma.study.update({
		// 	data: {
		// 		title,
		// 		endDate: new Date(year, month - 1, day),
		// 		description,
		// 		status: StudyStatus.new,
		// 		submissionDate: new Date(),
		// 		users: {
		// 			create: {
		// 				user: {
		// 					connect: {
		// 						id: coordinator
		// 					}
		// 				}
		// 			}
		// 		},
		// 		...insertDataTypes,
		// 		...upsertDocumentation,
		// 		...upsertImage
		// 	},
		// 	...studyIncludes
		// })
		return undefined
	}

	handleQuery<Study>({
		req,
		res,
		session,
		model: 'study',
		query: addParticipantsToStudyQuery
	})
})

export default apiRoute
