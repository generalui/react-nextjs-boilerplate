/*!
 * Participants Page
 */
import { PageWrapper } from 'partials/PageWrapper'
import { QueryBuilder } from 'partials/QueryBuilder'
import { ParticipantsProps } from './Participants.types'

export const Participants = function Participants({ testId = 'Participants' }: ParticipantsProps) {
	return (
		<PageWrapper title='Participants' testId={testId}>
			<QueryBuilder />
		</PageWrapper>
	)
}
