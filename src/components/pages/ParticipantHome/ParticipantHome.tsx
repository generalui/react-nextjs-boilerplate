/*!
 * Participant Home Page
 */
import { useParticipantTodos } from 'hooks/api/todos/useParticipantTodos'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useText } from 'hooks/useText'
import { PageWrapper } from 'partials/PageWrapper'
import { TodoList } from 'partials/TodoList'
import { ContactInfo } from 'common/ContactInfo'
import { EmergencyContact } from 'common/EmergencyContact'
import { ParticipantWelcome } from 'common/WelcomeContent'
import { ParticipantHomeProps } from './ParticipantHome.types'

export const ParticipantHome = ({ testId = 'ParticipantHome' }: ParticipantHomeProps) => {
	const { t } = useText('participant.home')
	const { currentUser } = useCurrentUser()
	const { todos = [] } = useParticipantTodos(currentUser?.participant?.id, {
		page: 0,
		pageSize: 3
	})

	return (
		<PageWrapper title={t('title')} testId={testId}>
			<ParticipantWelcome participantName={currentUser?.name || ''} />
			<div className='flex w-full flex-col xl:flex-row gap-8'>
				<ContactInfo className='flex-1' />
				<EmergencyContact className='flex-1' />
			</div>
			<TodoList concise todos={todos} title={t('todos')} />
		</PageWrapper>
	)
}
