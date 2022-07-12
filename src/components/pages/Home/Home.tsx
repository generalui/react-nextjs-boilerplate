import { useStudies } from 'hooks/api/useStudies'
import { useText } from 'hooks/useText'
import { PageWrapper } from 'partials/PageWrapper'
import { StudyList } from 'partials/StudyList'
import { Card } from 'common/Card'

export const Home = () => {
	const { t } = useText('home')
	const { studies = [], isLoading } = useStudies('new')
	console.log('~ studies', studies)

	return (
		<PageWrapper title={t('title')}>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* TODO: Replace and refactor; filler content */}
				<Card className='col-span-3 lg:col-span-1' title={t('currentStudies.title')}>
					<h1 className='text-green-400 font-bold text-3xl'>
						{t('currentStudies.placeHolderNumber')}
					</h1>
					<h4 className='mb-2'>{t('currentStudies.activeAndApproved')}</h4>
					<p>{t('currentStudies.description')}</p>
				</Card>
				<Card className='col-span-3 lg:col-span-1' title={t('dataVault.title')}>
					<h1 className='text-blue-400 font-bold text-3xl'>{t('dataVault.placeHolderNumber')}</h1>
					<h4 className='mb-2'>{t('dataVault.files')}</h4>
					<p>{t('dataVault.description')}</p>
				</Card>
				<Card className='col-span-3 lg:col-span-1' title={t('documentation.title')}>
					<h1 className='text-red-400 font-bold text-3xl'>
						{t('documentation.placeHolderNumber')}
					</h1>
					<h4 className='mb-2'>{t('documentation.files')}</h4>
					<p>{t('documentation.description')}</p>
				</Card>
				<div className='border-b lg:col-span-3 my-2' />
				<Card title={t('recentlyAddedStudies.title')} className='col-span-3'>
					<StudyList studies={studies} isLoading={isLoading} className='w-full' concise />
				</Card>
			</div>
		</PageWrapper>
	)
}
