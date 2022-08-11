import { useMemo } from 'react'
import { useText } from 'hooks/useText'
import { Button } from 'common/Button'
import { Card } from 'common/Card'
import { Details } from 'common/Details'
import { Icon } from 'common/Icon'
import { ContactInfoProps } from './ContactInfo.types'

const mockContactInfo = [
	{ title: 'name', value: 'Kyla Tsosie' },
	{ title: 'tribe', value: 'Cheyenne River Sioux' },
	{ title: 'email', value: 'kyla@awesome.com' },
	{ title: 'homePhone', value: '(505) 368-5118' },
	{ title: 'workPhone', value: '(505) 368-5118' },
	{ title: 'address', value: '10800 Cibola Loop NW, Unit 3012 Albuquerque NM 87114' }
]

export const ContactInfo = ({ className, testId = 'ContactInfo' }: ContactInfoProps) => {
	const { t } = useText('participant.home')

	const handleEditClick = () => console.log('Implement editing')

	const contactDetails = useMemo(
		() => mockContactInfo.map((detail) => ({ ...detail, title: t(`contactInfo.${detail.title}`) })),
		[t]
	)

	return (
		<Card
			action={
				<Button onClick={handleEditClick} v='xs'>
					<>
						<Icon icon='PencilAltIcon' size='sm' />
						{t('edit')}
					</>
				</Button>
			}
			className={className}
			headerClassName='pb-4 border-b border-gray-200'
			iconProps={{ icon: 'PhoneIcon', wrapperClass: 'bg-green-300' }}
			testId={testId}
			title={t('contactInfo.title')}
		>
			<Details details={contactDetails} />
		</Card>
	)
}
