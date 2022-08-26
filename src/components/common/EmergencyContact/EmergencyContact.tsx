import { useMemo } from 'react'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useText } from 'hooks/useText'
import { Card } from 'common/Card'
import { Details } from 'common/Details'
import { EmergencyContactProps } from './EmergencyContact.types'

const contactInfoKeys = [
	'emergencyContactName',
	'emergencyContactRelationship',
	'emergencyContactEmail',
	'emergencyContactHomePhone',
	'emergencyContactWorkPhone',
	'emergencyContactPhysicalAddress'
]

export const EmergencyContact = ({
	className,
	testId = 'EmergencyContact'
}: EmergencyContactProps) => {
	const { currentUser } = useCurrentUser()
	const { t } = useText('participant.home.emergencyContact')

	const emergencyContactDetails: { title: string; value: string }[] = useMemo(() => {
		const participant = currentUser?.participant

		if (!participant) {
			return []
		}

		const participantDetailEntries = Object.entries(participant).filter(([title]) =>
			contactInfoKeys.includes(title)
		)

		const participantDetails = participantDetailEntries.map(([title, value]) => ({
			title: t(`${title}`),
			value: value?.toString() || ''
		}))

		return [...participantDetails]
	}, [currentUser?.participant, t])

	return (
		<Card
			className={className}
			headerClassName='pb-4 border-b border-gray-200'
			iconProps={{ icon: 'Cross', wrapperClass: 'bg-red-500' }}
			testId={testId}
			title={t('title')}
		>
			<Details details={emergencyContactDetails} />
		</Card>
	)
}
