import { useAggregatedStudyData } from 'hooks/api/aggregatedData/useAggregatedStudyData'
import { useStudies } from 'hooks/api/useStudies'
import { useText } from 'hooks/useText'
import { AggregatedDataCard } from 'partials/AggregatedDataCard'
import { PageWrapper } from 'partials/PageWrapper'
import { StudyList } from 'partials/StudyList'
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
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Aggregated study data */}
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

				{/* Divider */}
				<div className='border-b col-span-1 col-span-3 my-2 border-color-black-400' />
				<Card title={t('recentlyAddedStudies.title')} className='col-span-3'>
					<StudyList studies={studies} isLoading={isLoading} className='w-full' concise />
				</Card>
			</div>
		</PageWrapper>
	)
}
