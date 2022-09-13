import { formatDisplayDate } from 'utils/client/date'
import { useText } from 'hooks/useText'
import { DataTypeContainer } from 'partials/DataTypeContainer'
import { EditStudy } from 'partials/EditStudy'
import { Card } from 'common/Card'
import { Detail } from 'common/Detail'
import { ImageWithPlaceholder } from 'common/ImageWithPlaceholder'
import { Loader } from 'common/Loader'
import { Text } from 'common/Text'
import { StudyInfoProps } from './StudyInfo.types'

export const StudyInfo = ({
	className,
	isAdmin,
	singleStudyId,
	loading,
	study,
	testId = 'StudyInfo'
}: StudyInfoProps) => {
	const { t } = useText('studies.details')

	return (
		<div className={className} data-testid={testId}>
			<Card
				action={isAdmin && <EditStudy studyId={singleStudyId} disabled={loading} />}
				className='flex flex-col gap-6'
				iconProps={{ icon: 'DocumentReportIcon' }}
				title={t('title')}
			>
				<div className='flex flex-col lg:flex-row items-start lg:items-center gap-6'>
					<ImageWithPlaceholder src={study?.image?.image?.url} className='h-52 w-52' />
					<div className='flex flex-col gap-3 justify-between lg:h-52 flex-grow w-full'>
						<div className='bg-gray-50 rounded px-4 py-2 flex-grow'>
							<Loader isLoading={loading}>
								<Text className='text-lg font-bold line-clamp-4 lg:line-clamp-none'>
									{study?.title}
								</Text>
							</Loader>
						</div>
						<div className='flex flex-col lg:flex-row gap-4 justify-between'>
							<Detail label={t('coordinator')}>{study?.users?.[0]?.user?.name}</Detail>
							<Detail label={t('submissionDate')}>
								{study?.submissionDate ? formatDisplayDate(study.submissionDate) : null}
							</Detail>
							<Detail label={t('endDate')}>
								{study?.endDate ? formatDisplayDate(study.endDate) : null}
							</Detail>
						</div>
					</div>
				</div>
				<Detail textColor='text-gray-500' label={t('description')}>
					{study?.description}
				</Detail>
				{isAdmin && (
					<Detail label={t('dataTypes')}>
						<DataTypeContainer study={study} />
					</Detail>
				)}
			</Card>
		</div>
	)
}
