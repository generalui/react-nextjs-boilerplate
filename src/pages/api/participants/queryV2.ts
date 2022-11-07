import { Participant } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Filter, QueryBuilderModel } from 'types/QueryBuilder'
import { ParticipantQueryBuilderStudyPayload } from 'types/Study'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { parseParamArray } from 'utils/api/parseParamArray'
import { prisma } from 'utils/api/prisma'
import { getSingleWhere } from 'utils/api/queryBuilder'
import { participantQueryInclude } from 'utils/includes/participantIncludes'
import { studySelectParticipantIds } from 'utils/includes/studyIncludes'

type ParticipantQueryReturn = {
	modelCount: number
	list: Participant[]
	studyCount: number
}

type GetParticipantsReturnType = Promise<ParticipantQueryReturn>

type GetParticipants = (where?: ReturnType<typeof getSingleWhere>) => GetParticipantsReturnType
const getParticipants: GetParticipants = async (where) => {
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

// TODO: move this function
const getWhereFromFilters = (filters: Filter[], model: QueryBuilderModel) => {
	// Filter relevant data model
	const filtersToParse = filters.filter((filter) => filter.model === model)

	// Filter handle empty case of relevant data model
	if (filtersToParse.length === 0) return { where: undefined }
	else if (filtersToParse.length === 1 && !filtersToParse[0].filterType)
		return { where: getSingleWhere(filtersToParse[0]) }

	// Parse filters
	const where = filtersToParse
		// Get compose statement from filters
		.reduce(
			(where: Record<string, unknown>, filter: Filter) => {
				const { filterType } = filter
				const currentWhere = getSingleWhere(filter)

				// Called only on first iteration
				if (!filterType) {
					return {
						...where,
						OR: [currentWhere]
					}
				}

				// Add to filterType on where
				else {
					return {
						...where,
						[filterType.toUpperCase()]: [
							...(where[filterType.toUpperCase()] as Record<string, unknown>[]),
							{ ...currentWhere }
						]
					}
				}
			},
			{
				OR: [],
				AND: []
			}
		)

	return { where }
}

type ParticipantsAndCount = [number, Participant['id'][], Participant['id'][]]
type GetStudyParticipantIdsAndCount = (
	studiesA: ParticipantQueryBuilderStudyPayload[],
	studiesB?: ParticipantQueryBuilderStudyPayload[]
) => ParticipantsAndCount
const getStudyParticipantIdsAndCount: GetStudyParticipantIdsAndCount = (
	studiesA,
	studiesB = []
) => {
	const studySet = new Set<string>()
	let studyCount = 0
	let participantIdsA = [] as Participant['id'][]
	let participantIdsB = [] as Participant['id'][]

	const incrementCount = (study: ParticipantQueryBuilderStudyPayload) => {
		if (!studySet.has(study.id)) {
			if (study.participants.length > 0) studyCount++
			studySet.add(study.id)
		}
	}

	const incrementParticipantIds = (
		currentList: Participant['id'][],
		study: ParticipantQueryBuilderStudyPayload
	) => [...new Set([...currentList, ...study.participants.map((p) => p.participant.id)])]

	// If no studies return empty state
	if (!studiesA.length && !studiesB?.length) return [0, [], []]
	else {
		for (const study of studiesA) {
			incrementCount(study)

			// Map participants from join table and add to running list
			participantIdsA = incrementParticipantIds(participantIdsA, study)
		}

		for (const study of studiesB) {
			incrementCount(study)

			participantIdsB = incrementParticipantIds(participantIdsB, study)
		}
	}

	return [studyCount, participantIdsA, participantIdsB]
}

type GetParticipantsViaStudy = (
	studyWhere: Record<string, unknown>,
	participantWhere: { where?: { OR: Record<string, unknown>[]; AND: Record<string, unknown>[] } }
) => GetParticipantsReturnType
const getParticipantsViaStudy: GetParticipantsViaStudy = async (studyWhere, participantWhere) => {
	let participantViaStudyWhere = participantWhere.where || { OR: [], AND: [] }
	if (participantWhere.where?.OR || participantWhere.where?.AND) {
		participantViaStudyWhere = participantWhere.where
	} else if (participantWhere.where) {
		participantViaStudyWhere = {
			OR: [participantWhere.where],
			AND: []
		}
	} else {
		participantViaStudyWhere = { OR: [], AND: [] }
	}

	let studyCount = 0

	if (studyWhere.AND || studyWhere.OR) {
		const [studiesAND, studiesOR] = await prisma.$transaction([
			prisma.study.findMany({
				...studyWhere,
				...studySelectParticipantIds
			}),
			prisma.study.findMany({
				...studyWhere,
				...studySelectParticipantIds
			})
		])
		const [count, studyParticipantANDIds, studyParticipantORIds] = getStudyParticipantIdsAndCount(
			studiesAND as ParticipantQueryBuilderStudyPayload[],
			studiesOR as ParticipantQueryBuilderStudyPayload[]
		)

		studyCount = count

		participantViaStudyWhere.AND = [
			...participantViaStudyWhere.AND,
			{ id: { in: studyParticipantANDIds } }
		]

		participantViaStudyWhere.OR = [
			...participantViaStudyWhere.OR,
			{ id: { in: studyParticipantORIds } }
		]
	} else {
		// Study is the only filter
		const studies = await prisma.study.findMany({
			...studyWhere,
			...studySelectParticipantIds
		})

		const [count, participantIDs] = getStudyParticipantIdsAndCount(
			studies as ParticipantQueryBuilderStudyPayload[]
		)

		studyCount = count
		participantViaStudyWhere = {
			OR: [...participantViaStudyWhere.OR, { id: { in: participantIDs } }],
			AND: [...participantViaStudyWhere.AND]
		}
	}

	const participants = await prisma.participant.findMany({
		where: participantViaStudyWhere,
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

		const studyWhere = getWhereFromFilters(filters, QueryBuilderModel.study)
		const participantWhere = getWhereFromFilters(filters, QueryBuilderModel.participant)

		if (studyWhere.where && Object.keys(studyWhere.where).length > 0) {
			// Do complicated study query
			return await getParticipantsViaStudy(studyWhere, participantWhere)
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

/**
 * Where condition brain storming bellow (delete when complete)
				CURRENT 
				where = {
					title: { contains: string },   - > A
					OR: [
						{dataTypes: { has: StudyDataType }},  - > B
						{-: { has: StudyDataType }},  - > C
					],
					AND: [
						{updatedAt: { has: StudyDataType }}, - > D
						{-: { has: StudyDataType }}, - > E
					]
				}
				A AND (B OR C) AND (D AND E)
			 */

/* 
				OPTION 2 - middle ground
				where = {
					OR: [
						firstFilter, - > A
						
					],
					AND: [
						{title: {eq:string}},
						{title: {eq:string}},
					]
				}
				(B OR C OR F) AND (D AND E)
			 */

/*
			SIMPLE 
			where = {
				title: { contains: string },        - > A
				dataTypes: { has: StudyDataType }}  - > B
			}
			A AND B
			 */
/* 
				IDEAL 
				where = {
					(AND or OR): [
						{dataTypes: { has: StudyDataType }},  - > B
						{
							(AND or OR): [
								{dataTypes: { has: StudyDataType }},  - > B
								... potentially additional nested where statements
							]
						},  - > C
					]
				
				}
				A AND (B OR C) AND (D AND E)
			 */
// Single filter no filterType (first filter will never have a filter type)
