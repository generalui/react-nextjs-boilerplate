import { useAggregatedStudyData } from 'hooks/api/aggregatedData/useAggregatedStudyData'
import { useStudies } from 'hooks/api/studies/useStudies'
import { useText } from 'hooks/useText'
import { AggregatedDataCardGallery } from 'partials/AggregatedDataCardGallery'
import { PageWrapper } from 'partials/PageWrapper'
import { StudyList } from 'partials/StudyList'
import { AdminWelcome } from 'common/WelcomeContent'

export const Home = () => {
	const { t } = useText('home')
	const { studies = [], isLoading } = useStudies({ page: 0, pageSize: 5 })

	const { data } = useAggregatedStudyData()
	const aggregatedData = [
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
	].map(({ dataType, ...passThrough }) => ({
		...passThrough,
		title: t(`${dataType}.title`),
		className: 'col-span-3 lg:col-span-1',
		key: dataType,
		subTitle: t(`${dataType}.subTitle`),
		description: t(`${dataType}.description`)
	}))

	return (
		<PageWrapper title={t('title')} withSpace={false}>
			{/* Client about info */}
			<AdminWelcome className='mb-12' />

			{/* Aggregated study data */}
			<AggregatedDataCardGallery aggregatedData={aggregatedData} />

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
