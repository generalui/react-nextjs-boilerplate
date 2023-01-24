import { ConsentEnum } from '@prisma/client'
import { ConsentInput, ConsentPickDataTypes } from 'types/Consent'
import { useParticipantTodoConsent } from 'hooks/api/todos/useParticipantTodoConsent'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useText } from 'hooks/useText'
import { DataTypeContainer } from 'partials/DataTypeContainer'
import { EditConsent } from 'partials/EditConsent'
import { StatusBadge } from 'partials/StatusBadge'
import { Card } from 'common/Card'
import { Icon } from 'common/Icon'
import { Text } from 'common/Text'
import { TodoConsentProps } from './TodoConsent.types'

const getConsentStatus = (consent?: ConsentPickDataTypes) => {
	return consent
		? Object.values(consent).reduce(
				(result, consentDataType) => result || consentDataType === ConsentEnum.yes,
				false
		  )
		: false
}

export const TodoConsent = ({ todo, testId = 'TodoConsent' }: TodoConsentProps) => {
	const { currentUser } = useCurrentUser()
	const { t } = useText('participant.todo.consent')
	const { consent, updateConsent } = useParticipantTodoConsent(
		currentUser?.participant?.id,
		todo?.id
	)
	const handleEditConsent = (consentValues: ConsentInput) => {
		updateConsent.mutate(consentValues)
	}
	const consentGiven = getConsentStatus(consent)

	return (
		<div data-testid={testId}>
			<Card
				iconProps={{ className: 'text-white', icon: 'Consents' }}
				title={t('title')}
				action={
					<EditConsent consent={consent} modalName='edit-consent' onSubmit={handleEditConsent} />
				}
			>
				<div className='flex flex-col gap-4'>
					<Text className='text-gray-500' size='sm'>
						{t('description')}
					</Text>
					<div className='flex gap-2 items-center'>
						<StatusBadge v={consentGiven ? 'approved' : 'archived'} />
						<Text className='text-lg font-bold line-clamp-4 lg:line-clamp-none'>
							{consentGiven ? t('hasConsent') : t('noConsent')}
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
