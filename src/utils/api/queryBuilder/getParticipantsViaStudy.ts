import { GetParticipantsViaStudy } from 'types/ParticipantQueryBuilder'
import { WhereStatementWithFilterType } from 'types/QueryBuilder'
import { ParticipantQueryBuilderStudyPayload } from 'types/Study'
import { prisma } from 'utils/api/prisma'
import { getStudyParticipantIdsAndCount } from 'utils/api/queryBuilder/getStudyParticipantIdsAndCount'
import { participantQueryInclude } from 'utils/includes/participantIncludes'
import { studySelectParticipantIds } from 'utils/includes/studyIncludes'

export const getParticipantsViaStudy: GetParticipantsViaStudy = async (
	studyWhere,
	participantWhere
) => {
	if (!studyWhere.where) return { modelCount: 0, list: [], studyCount: 0 }
	let participantViaStudyWhere: WhereStatementWithFilterType = { OR: [], AND: [] }
	if (
		participantWhere.where &&
		('OR' in participantWhere.where || 'AND' in participantWhere.where)
	) {
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

	if ('AND' in studyWhere || 'OR' in studyWhere) {
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
