import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'
import { SurveyResponses } from 'pages/AddSurvey'

const apiRoute = connect()

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)
	const { surveyResponses } = req.body as { surveyResponses: SurveyResponses }
	const { todoId } = req.query as { todoId: string }

	const addSurveyToTodoQuery = async () => {
		surveyResponses.map(async (sr) => {
			sr.map(async (singleResponse) => {
				const prismaSurvey = {
					surveyId: singleResponse.survey_id as string,
					timestamp: singleResponse.timestamp as string,
					participantId: singleResponse.participant_id as string,
					redcapEventName: singleResponse.redcap_event_name as string,
					responses: singleResponse.survey_responses as Prisma.InputJsonValue
				}

				await prisma.surveyResponse.create({
					data: {
						...prismaSurvey,
						todo: {
							connect: {
								id: todoId
							}
						}
					}
				})
			})
		})
	}

	handleQuery({
		req,
		res,
		session,
		model: 'todo',
		role: 'admin',
		query: addSurveyToTodoQuery
	})
})

export default apiRoute
