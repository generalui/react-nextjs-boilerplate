import { PageWrapper } from 'partials/PageWrapper'
import { ParticipantQueryBuilder } from 'partials/ParticipantQueryBuilder'
import { ParticipantsProps } from './Participants.types'

export const Participants = function Participants({ testId = 'Participants' }: ParticipantsProps) {
	return (
		<PageWrapper title='Participants' testId={testId}>
			<ParticipantQueryBuilder />
		</PageWrapper>
	)
}
