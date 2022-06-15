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

export const Studies = function Studies({ studies, testId = 'Studies' }: StudiesProps) {
	const { t } = useText('studies')

	return (
		<PageWrapper title='Studies' data-testid={testId}>
			<PageHeader>
				<Button>+ Add Study</Button>
			</PageHeader>
			<List
				columns={[
					{
						key: 'imageUrl',
						title: t('list.image'),
						width: 1
					},
					{
						key: 'title',
						className: 'font-bold text-sm text-gray-700 line-clamp-2',
						title: t('list.studyName'),
						width: 5
					},
					{
						key: 'coordinator',
						className: 'text-base text-gray-900 font-semibold',
						title: t('list.coordinator'),
						width: 3
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
						className: 'flex justify-center',
						width: 1
					}
				]}
				data={studies.map((study) => {
					return {
						imageUrl: <img src={study.imageUrl} alt={study.title} className='rounded' />,
						title: study.title,
						coordinator: (
							<div className='flex flex-col'>
								{study.coordinator.name}
								<div className={subtleText}>{study.coordinator.email}</div>
							</div>
						),
						submissionDate: new Date(study.submissionDate).toLocaleDateString(),
						status: <IconBadge variant={study.status} />
					}
				})}
			/>
		</PageWrapper>
	)
}
