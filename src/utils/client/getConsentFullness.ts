import { Consent, ConsentEnum } from '@prisma/client'
import { ConsentState } from 'types/Consent'
import { ParticipantWithConsent } from 'types/Participants'
import { Todo, TodoWithConsent } from 'types/Todo'

export const getParticipantConsentFullness = (participant: ParticipantWithConsent) => {
	const { todos } = participant

	return (
		todos.reduce((fullness: ConsentState | undefined, todo) => {
			const currentConsent = getConsentFullness(todo.consent)

			switch (fullness) {
				case undefined:
					return currentConsent
				case ConsentState.partial:
					return ConsentState.partial
				case ConsentState.full:
					return currentConsent === ConsentState.full ? ConsentState.full : ConsentState.partial
				case ConsentState.none:
					return currentConsent === ConsentState.none ? ConsentState.none : ConsentState.partial
			}
		}, undefined) ?? ConsentState.none
	)
}

type GetConsentFullness = (consent: Consent) => ConsentState
export const getConsentFullness: GetConsentFullness = (consent) => {
	const { analyses, geneticData, healthRecords, specimens } = consent

	const fullness = [analyses, geneticData, healthRecords, specimens].filter(
		(c) => c === ConsentEnum.yes
	).length

	return fullness === 0
		? ConsentState.none
		: fullness === 4
		? ConsentState.full
		: ConsentState.partial
}
