import { useParticipantStudyConsent } from 'hooks/api/studies/useParticipantStudyConsent'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useText } from 'hooks/useText'
import { DataTypeContainer } from 'partials/DataTypeContainer'
import { EditConsent } from 'partials/EditConsent'
import { StatusBadge } from 'partials/StatusBadge'
import { Card } from 'common/Card'
import { Icon } from 'common/Icon'
import { Text } from 'common/Text'
import { StudyConsentProps } from './StudyConsent.types'

export const StudyConsent = ({ study, testId = 'StudyConsent' }: StudyConsentProps) => {
	const { currentUser } = useCurrentUser()
	const { t } = useText('participant.study.consent')
	const { consent } = useParticipantStudyConsent(currentUser?.participant?.id, study?.id)
	console.log('StudyConsent ~ consent', consent)

	return (
		<div data-testid={testId}>
			<Card
				iconProps={{ className: 'text-white', icon: 'Consents' }}
				title={t('title')}
				action={<EditConsent modalName='edit-consent' />}
			>
				<div className='flex flex-col gap-4'>
					<Text className='text-gray-500' size='sm'>
						{t('description')}
					</Text>
					<div className='flex gap-2 items-center'>
						<StatusBadge v={consent ? 'approved' : 'archived'} />
						<Text className='text-lg font-bold line-clamp-4 lg:line-clamp-none'>
							{consent ? t('hasConsent') : t('noConsent')}
						</Text>
					</div>
					<div>
						<Text className='text-gray-500 mb-2' size='xs'>
							{t('dataTypes')}
						</Text>
						<DataTypeContainer consent={consent} />
					</div>
					<div className='flex gap-2 items-center justify-between w-10/12'>
						<div className='flex gap-2 items-center'>
							<Icon icon={'Pdf'} className='text-gray-500' size='sm' />
							<Text className='text-gray-500' size='xs'>
								{currentUser?.participant?.id.toUpperCase()}
							</Text>
						</div>
						<Text className='text-gray-500' size='xs'>
							{'05/23/2022'}
						</Text>
					</div>
				</div>
			</Card>
		</div>
	)
}
