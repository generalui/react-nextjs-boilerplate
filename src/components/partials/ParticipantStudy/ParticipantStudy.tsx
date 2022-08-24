/*!
 * ParticipantStudy Page
 */
import Image from 'next/image'
import { useText } from 'hooks/useText'
import { StatusBadge } from 'partials/StatusBadge'
import { Card } from 'common/Card'
import { Text } from 'common/Text'
import { ParticipantStudyProps } from './ParticipantStudy.types'

export const ParticipantStudy = function ParticipantStudy({
	testId = 'ParticipantStudy'
}: ParticipantStudyProps) {
	const { t } = useText('participant.study')
	const consent = true

	return (
		<div data-testid={testId}>
			<Card iconProps={{ icon: 'UserGroupIcon' }} title={t('consent.title')}>
				<div className='flex flex-col gap-4'>
					<Text className='text-gray-500' size='sm'>
						{t('consent.description')}
					</Text>
					<div className='flex gap-2 items-center'>
						<StatusBadge v={consent ? 'approved' : 'archived'} />
						<Text className='text-lg font-bold line-clamp-4 lg:line-clamp-none'>
							{consent ? t('consent.hasConsent') : t('consent.noConsent')}
						</Text>
					</div>
					<div className='flex gap-2 items-center justify-between w-10/12'>
						<div className='flex gap-2 items-center'>
							<Image
								src={'/icons/pdf.svg'}
								alt={t('pdfIconAlt')}
								className='fill-gray-500'
								width={20}
								height={20}
							/>
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
