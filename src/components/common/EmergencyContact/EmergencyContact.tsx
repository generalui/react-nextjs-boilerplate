import { useMemo } from 'react'
import { useText } from 'hooks/useText'
import { Button } from 'common/Button'
import { Card } from 'common/Card'
import { Details } from 'common/Details'
import { Icon } from 'common/Icon'
import { EmergencyContactProps } from './EmergencyContact.types'

const mockData = [
	{ title: 'name', value: 'Bill Tsosie' },
	{ title: 'relationship', value: 'Spouse' },
	{ title: 'email', value: 'bill@awesome.com' },
	{ title: 'homePhone', value: '(505) 368-5118' },
	{ title: 'workPhone', value: '(505) 368-5118' },
	{ title: 'address', value: '10800 Cibola Loop NW, Unit 3012 Albuquerque NM 87114' }
]

export const EmergencyContact = ({
	className,
	testId = 'EmergencyContact'
}: EmergencyContactProps) => {
	const { t: home } = useText('participant.home')
	const { t } = useText('participant.home.emergencyContact')

	const handleEditClick = () => console.log('Implement editing')

	const data = useMemo(() => mockData.map((detail) => ({ ...detail, title: t(detail.title) })), [t])

	return (
		<Card
			action={
				<Button onClick={handleEditClick} v='xs'>
					<>
						<Icon icon='PencilAltIcon' size='sm' />
						{home('edit')}
					</>
				</Button>
			}
			className={className}
			headerClassName='pb-4 border-b border-gray-200'
			iconProps={{ icon: 'Cross', wrapperClass: 'bg-red-500' }}
			testId={testId}
			title={t('title')}
		>
			<Details details={data} />
		</Card>
	)
}
