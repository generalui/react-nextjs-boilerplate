import { useAggregatedStudyData } from 'hooks/api/aggregatedData/useAggregatedStudyData'
import { useStudies } from 'hooks/api/useStudies'
import { useText } from 'hooks/useText'
import { AggregatedDataCard } from 'partials/AggregatedDataCard'
import { PageWrapper } from 'partials/PageWrapper'
import { StudyList } from 'partials/StudyList'
import { Card } from 'common/Card'
import { AdminWelcome } from 'common/WelcomeContent'

export const Home = () => {
	const { t } = useText('home')
	const { studies = [], isLoading } = useStudies({ page: 0, pageSize: 5 })

	const { data } = useAggregatedStudyData()
	const AggregatedData = [
		{
			dataClassName: 'text-accent-1',
			value: data?.totalStudies,
			dataType: 'currentStudies'
		},
		{
			dataClassName: 'text-accent-2',
			value: data?.totalDataVaultElements,
			dataType: 'dataVault'
		},
		{
			dataClassName: 'text-accent-3',
			value: data?.totalDocuments,
			dataType: 'documentation'
		}
	]

	return (
		<PageWrapper title={t('title')} withSpace={false}>
			{/* Client about info */}
			<AdminWelcome className='mb-12' />

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
			<StudyList
				className='w-full'
				concise
				isLoading={isLoading}
				studies={studies}
				title={t('recentlyAddedStudies.title')}
			/>
		</PageWrapper>
	)
}
