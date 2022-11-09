import { Participant } from '@prisma/client'
import { GetStudyParticipantIdsAndCount } from 'types/ParticipantQueryBuilder'
import { ParticipantQueryBuilderStudyPayload } from 'types/Study'

export const getStudyParticipantIdsAndCount: GetStudyParticipantIdsAndCount = (
	studiesAnd,
	studiesOr = []
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
	if (!studiesAnd.length && !studiesOr?.length) return [0, [], []]
	else {
		for (const study of studiesAnd) {
			incrementCount(study)

			// Map participants from join table and add to running list
			participantIdsA = incrementParticipantIds(participantIdsA, study)
		}

		for (const study of studiesOr) {
			incrementCount(study)

			participantIdsB = incrementParticipantIds(participantIdsB, study)
		}
	}

	return [studyCount, participantIdsA, participantIdsB]
}
