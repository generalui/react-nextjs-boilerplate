/*!
 * Participant Home Page
 */
import { useUserStudies } from 'hooks/api/studies/useUserStudies'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useText } from 'hooks/useText'
import { DataVaultList } from 'partials/DataVaultList'
import { PageWrapper } from 'partials/PageWrapper'
import { StudyList } from 'partials/StudyList'
import { ContactInfo } from 'common/ContactInfo'
import { EmergencyContact } from 'common/EmergencyContact'
import { ParticipantWelcome } from 'common/WelcomeContent'
import { ParticipantHomeProps } from './ParticipantHome.types'

export const ParticipantHome = ({ testId = 'ParticipantHome' }: ParticipantHomeProps) => {
	const { t } = useText('participant.home')
	const { currentUser } = useCurrentUser()
	const { studies = [] } = useUserStudies(currentUser?.id || '', { page: 0, pageSize: 3 })

	console.log(studies)

	return (
		<PageWrapper title='ParticipantHome' testId={testId}>
			<ParticipantWelcome className='mb-12' participantName={currentUser?.name || ''} />
			<div className='flex w-full flex-col xl:flex-row gap-8'>
				<ContactInfo className='flex-1' />
				<EmergencyContact className='flex-1' />
			</div>
			<StudyList concise studies={studies} title={t('studies')} />
			<DataVaultList studyId={studies[0]?.id || ''} title={t('dataVault')} />
		</PageWrapper>
	)
}
