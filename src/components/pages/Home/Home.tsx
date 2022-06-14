import { useText } from 'hooks/useText'
import { CreateStudy } from 'partials/CreateStudy'
import { PageWrapper } from 'partials/PageWrapper'
import { Card } from 'common/Card'
import { PageHeader } from 'common/PageHeader'

export const Home = () => {
	const { t } = useText('home')

	return (
		<PageWrapper title={t('title')}>
			<PageHeader>
				<CreateStudy />
			</PageHeader>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* TODO: Replace and refactor; filler content */}
				<Card title={'Current Studies'}>
					<h1 className='text-green-400 font-bold text-3xl'>8</h1>
					<h4 className='mb-2'>Active & Approved</h4>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
					</p>
				</Card>
				<Card title='Data Vault'>
					<h1 className='text-blue-400 font-bold text-3xl'>2,000</h1>
					<h4 className='mb-2'>Files</h4>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
					</p>
				</Card>
				<Card title='Documentation'>
					<h1 className='text-red-400 font-bold text-3xl'>42</h1>
					<h4 className='mb-2'>Files</h4>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
					</p>
				</Card>
				<div className='border-b lg:col-span-3 my-2' />
				<Card title='Recently Added Studies' className='col-span-3'>
					<div className='flex justify-center items-center py-14'>
						<p>[ A beautiful list of studies recently added studies]</p>
					</div>
				</Card>
			</div>
		</PageWrapper>
	)
}
