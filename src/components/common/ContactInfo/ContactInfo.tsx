import { useMemo } from 'react'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useText } from 'hooks/useText'
import { Card } from 'common/Card'
import { Details } from 'common/Details'
import { ContactInfoProps } from './ContactInfo.types'

const contactInfoKeys = [
	'name',
	'email',
	'homePhone',
	'workPhone',
	'physicalAddress',
	'enrolledTribe'
]

export const ContactInfo = ({ className, testId = 'ContactInfo' }: ContactInfoProps) => {
	const { currentUser } = useCurrentUser()
	const { t } = useText('participant.home.contactInfo')

	const contactDetails: { title: string; value: string }[] = useMemo(() => {
		const participant = currentUser?.participant

		if (!participant) {
			return []
		}

		const userDetails = [
			{ title: t('name'), value: currentUser.name || '' },
			{ title: t('email'), value: currentUser.email || '' }
		]

		const participantDetailEntries = Object.entries(participant).filter(([title]) =>
			contactInfoKeys.includes(title)
		)

		const participantDetails = participantDetailEntries.map(([title, value]) => ({
			title: t(`${title}`),
			value: value?.toString() || ''
		}))

		return [...userDetails, ...participantDetails]
	}, [currentUser?.email, currentUser?.name, currentUser?.participant, t])

	return (
		<Card
			className={className}
			headerClassName='pb-4 border-b border-gray-200'
			iconProps={{ icon: 'PhoneIcon', wrapperClass: 'bg-green-300' }}
			testId={testId}
			title={t('title')}
		>
			<Details details={contactDetails} />
		</Card>
	)
}
