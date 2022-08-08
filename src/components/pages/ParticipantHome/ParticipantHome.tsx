/*!
 * Participant Home Page
 */
import { useStudies } from 'hooks/api/useStudies'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useText } from 'hooks/useText'
import { DataVaultList } from 'partials/DataVaultList'
import { PageWrapper } from 'partials/PageWrapper'
import { StudyList } from 'partials/StudyList'
import { ParticipantWelcome } from 'common/WelcomeContent'
import { ParticipantHomeProps } from './ParticipantHome.types'

export const ParticipantHome = ({ testId = 'ParticipantHome' }: ParticipantHomeProps) => {
	const { t } = useText('participant.home')
	const { currentUser } = useCurrentUser()
	const { studies = [] } = useStudies()

	return (
		<PageWrapper title='ParticipantHome' testId={testId}>
			<ParticipantWelcome className='mb-12' participantName={currentUser?.name || ''} />
			<StudyList concise studies={studies} title={t('studies')} />
			<DataVaultList studyId={studies[0]?.id || ''} title={t('dataVault')} />
		</PageWrapper>
	)
}
