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
	const whereStatement = filters
		.filter((filter) => filter.model === model)
		.reduce((where, filter: Filter) => {
			const { filterType } = filter
			const currentWhere = { ...getSingleWhere(filter) }

			if (filterType) {
				where = { [filterType.toUpperCase()]: [{ ...where }, { ...currentWhere }] }
			} else {
				where = { ...where, ...currentWhere }
			}

			return where
		}, {})
	return { where: whereStatement }
}

const getParticipantsViaStudy = async (whereStatement: Record<string, unknown>) => {
	const studies = await prisma.study.findMany({
		...whereStatement,
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

		if (Object.keys(studyWhere.where).length > 0) {
			// Do complicated study query
			return await getParticipantsViaStudy(studyWhere)
		} else {
			// Do less complicated single layer participant study
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
