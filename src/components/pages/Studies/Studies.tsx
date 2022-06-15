/*!
 * Studies
 */
import { useText } from 'hooks/useText'
import { Button } from 'components/common/Button'
import { IconBadge } from 'components/common/IconBadge'
import { PageHeader } from 'components/common/PageHeader'
import { List } from 'components/partials/List'
import { PageWrapper } from 'partials/PageWrapper'
import { subtleText } from 'styles/typography'
import { StudiesProps } from './Studies.types'

export const Studies = function Studies({ testId = 'Studies' }: StudiesProps) {
	const { t } = useText('studies')

	return (
		<PageWrapper title='Studies' data-testid={testId}>
			<PageHeader>
				<Button>+ Add Study</Button>
			</PageHeader>
			<List
				columns={[
					{
						key: 'image',
						title: t('list.image'),
						width: 1
					},
					{
						key: 'name',
						className: 'font-bold text-sm text-gray-700 line-clamp-2',
						title: t('list.studyName'),
						width: 6
					},
					{
						key: 'owner',
						className: 'text-base text-gray-900 font-semibold',
						title: t('list.owner'),
						width: 2
					},
					{
						key: 'submissionDate',
						className: subtleText,
						title: t('list.submissionDate'),
						width: 2
					},
					{
						key: 'status',
						title: t('list.status'),
						width: 1
					}
				]}
				data={[
					{
						image: <img src='/images/study1.png' alt='PCR' className='rounded' />,
						name: 'Real-time PCR designs to estimate nuclear and mitochondrial DNA copy number in forensic and ancient DNA studies',
						owner: (
							<div className='flex flex-col'>
								Neil Sims <div className={subtleText}>email@example.com</div>
							</div>
						),
						submissionDate: '07/21/2022',
						status: <IconBadge variant='new' />
					},
					{
						image: <img src='/images/study2.png' alt='DNA' className='rounded' />,
						name: 'Distribution of mitochondrial DNA lineages among Native American tribes of Northeastern North America',
						owner: (
							<div className='flex flex-col'>
								Jane Williams
								<div className={subtleText}>email@example.com</div>
							</div>
						),
						submissionDate: '05/12/2022',
						status: <IconBadge variant='approved' />
					},
					{
						image: <img src='/images/study3.png' alt='Gene' className='rounded' />,
						name: 'Development of Gene Editing and Cell Culture Capacity and Expertise in the Tribal Northern Plains',
						owner: (
							<div className='flex flex-col'>
								Thomas Lean
								<div className={subtleText}>email@example.com</div>
							</div>
						),
						submissionDate: '03/04/2022',
						status: <IconBadge variant='archived' />
					}
				]}
			/>
		</PageWrapper>
	)
}
