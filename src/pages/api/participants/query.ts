import { Participant } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Filter, QueryBuilderModel } from 'types/QueryBuilder'
import { StudyWithParticipantIds } from 'types/Study'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { parseParamArray } from 'utils/api/parseParamArray'
import { prisma } from 'utils/api/prisma'
import { getSingleWhere } from 'utils/api/queryBuilder'
import { participantQueryInclude } from 'utils/includes/participantIncludes'
import { studyIncludesParticipantIds } from 'utils/includes/studyIncludes'

const getParticipants = async (where?: ReturnType<typeof getSingleWhere>) => {
	// Get participants
	const [modelCount, participants] = await prisma.$transaction([
		prisma.participant.count({ ...where }),
		prisma.participant.findMany({
			...where,
			...participantQueryInclude
		})
	])

	// Get study count
	const studyCount = await prisma.study.count({
		where: {
			participants: {
				some: {
					participant: {
						id: {
							in: participants.map((p) => p.id)
						}
					}
				}
			}
		}
	})

	return { modelCount: modelCount ?? 0, list: participants || [], studyCount }
}

const apiRoute = connect()
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { model } = req.query as {
		model: QueryBuilderModel
	}

	const filters = parseParamArray<Filter>(req.query['filters[]'])

	// Filter participants on studies
	let query: () => Promise<
		| {
				modelCount: number
				studyCount: number
				list: Participant[]
		  }
		| undefined
	> = async () => undefined

	// General query
	if (!filters?.length) query = () => getParticipants()

	// Iterate over filters
	// currently only 1
	for (const filter of filters) {
		if (filter.model === 'study') {
			query = async () => {
				// Query study based on filter
				const studyWhere = getSingleWhere(filter)

				const studies = await prisma.study.findMany({
					...studyWhere,
					...studyIncludesParticipantIds
				})
				let studyCount = 0
				const studyParticipantIds = (studies as StudyWithParticipantIds[])?.reduce(
					(pList: string[], study: StudyWithParticipantIds) => {
						// Increment study count if study contains a participant
						if (study.participants.length) studyCount++

						// Add participant ID's to list
						return [...pList, ...study.participants.map((p) => p.participant.id)]
					},
					[]
				)

				const participants = await prisma.participant.findMany({
					where: { id: { in: studyParticipantIds } },
					...participantQueryInclude
				})

				return { modelCount: participants?.length || 0, list: participants || [], studyCount }
			}
		} else {
			// Query participant based on filter
			query = async () => {
				// Query study based on filter
				const participantWhere = getSingleWhere(filter)
				return await getParticipants(participantWhere)
			}
		}
	}

	handleQuery({
		req,
		res,
		model: model as QueryBuilderModel,
		query,
		role: 'admin',
		disableLog: true
	})
})

export default apiRoute
