import { useAggregatedStudyData } from 'hooks/api/aggregatedData/useAggregatedStudyData'
import { useStudies } from 'hooks/api/useStudies'
import { useText } from 'hooks/useText'
import { AggregatedDataCard } from 'partials/AggregatedDataCard'
import { PageWrapper } from 'partials/PageWrapper'
import { StudyList } from 'partials/StudyList'
import { AboutClient } from 'common/AboutClient'
import { Card } from 'common/Card'

export const Home = () => {
	const { t } = useText('home')
	const { studies = [], isLoading } = useStudies('new')
	const { data } = useAggregatedStudyData()
	const AggregatedData = [
		{
			dataClassName: 'text-green-400',
			value: data?.totalStudies,
			dataType: 'currentStudies'
		},
		{
			dataClassName: 'text-blue-400',
			value: data?.totalDataVaultElements,
			dataType: 'dataVault'
		},
		{
			dataClassName: 'text-red-400',
			value: data?.totalDocuments,
			dataType: 'documentation'
		}
	]

	return (
		<PageWrapper title={t('title')}>
			{/* Client about info */}
			<AboutClient className='mb-12' />

			{/* Aggregated study data */}
			<div className='flex flex-col lg:flex-row gap-6'>
				{AggregatedData.map(({ dataType, dataClassName, value }) => (
					<AggregatedDataCard
						key={dataType}
						className='col-span-3 lg:col-span-1'
						title={t(`${dataType}.title`)}
						dataClassName={dataClassName}
						dataValue={value}
						subTitle={t(`${dataType}.subTitle`)}
						description={t(`${dataType}.description`)}
					/>
				))}
			</div>

			{/* Divider */}
			<div className='border-b col-span-1 col-span-3 border-color-black-400 my-9' />

			{/* Recently added studies */}
			<Card title={t('recentlyAddedStudies.title')} className='col-span-3'>
				<StudyList studies={studies} isLoading={isLoading} className='w-full' concise />
			</Card>
		</PageWrapper>
	)
}
