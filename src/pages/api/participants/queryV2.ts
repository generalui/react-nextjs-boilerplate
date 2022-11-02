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

const getWhereFromFilters = (filters: Filter[], model: QueryBuilderModel) => {
	const where = {}

	filters.reduce((where, filter: Filter) => {
		const { field, condition, value, filterType } = filter

		if (filterType) {
			const newWhereStatement = {
				[filterType]: {
					[field]: {
						[condition]: value
					}
				}
			}
		} else {
			const newWhereStatement = {
				[field]: {
					[condition]: value
				}
			}
		}

		return filter
	})
}

const apiRoute = connect()
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { model } = req.query as {
		model: QueryBuilderModel
	}

	const filters = parseParamArray<Filter>(req.query['filters[]'])

	// Study
	const query = async () => {
		// General query
		if (!filters?.length) return await getParticipants()

		// Iterate over filters
		const studyFilters = filters.filter((filter) => filter.model === 'study')
		const participantFilters = filters.filter((filter) => filter.model === 'participant')

		// Parse study filters
		const studyWhere = getWhereFromFilters(studyFilters, 'study')

		// Parse participant filters
		const participantWhere = getWhereFromFilters(participantFilters, 'participant')

		if (studyWhere) {
			// Do complicated study query
			console.log('query ~ studyWhere', studyWhere)
			// return await getParticipantsViaStudy(participantWhere)
		} else {
			// Do less complicated single layer participant study
			console.log('query ~ participantWhere', participantWhere)
			return await getParticipants(participantWhere)
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
