import { useText } from 'hooks/useText'
import { StatusBadge } from 'partials/StatusBadge'
import { Card } from 'common/Card'
import { Icon } from 'common/Icon'
import { Text } from 'common/Text'
import { StudyConsentProps } from './StudyConsent.types'

export const StudyConsent = ({ testId = 'StudyConsent' }: StudyConsentProps) => {
	const { t } = useText('participant.study.consent')
	const consent = true

	return (
		<div data-testid={testId}>
			<Card iconProps={{ className: 'text-white', icon: 'Consents' }} title={t('title')}>
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
					<div className='flex gap-2 items-center justify-between w-10/12'>
						<div className='flex gap-2 items-center'>
							<Icon icon={'Pdf'} className='text-gray-500' size='sm' />
							<Text className='text-gray-500' size='xs'>
								{'6712A4B97F2289C3'}
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
