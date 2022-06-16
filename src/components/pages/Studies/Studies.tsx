/*!
 * Studies
 */
import { useStudies } from 'hooks/api/useStudies'
import { useText } from 'hooks/useText'
import { List } from 'partials/List'
import { PageWrapper } from 'partials/PageWrapper'
import { Button } from 'common/Button'
import { Icon } from 'common/Icon'
import { IconBadge } from 'common/IconBadge'
import { PageHeader } from 'common/PageHeader'
import { Text } from 'common/Text'
import { StudiesProps } from './Studies.types'

export const Studies = function Studies({ testId = 'Studies' }: StudiesProps) {
	const { t } = useText('studies')
	const { data = [], isLoading } = useStudies()

	return (
		<PageWrapper title='Studies' data-testid={testId}>
			<PageHeader>
				<Button>
					<Icon icon='PlusIcon' size={20} />
					Add Study
				</Button>
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
				data={data.map((study) => ({
					imageUrl: <img src={study.imageUrl} alt={study.title} className='rounded' />,
					title: study.title,
					coordinator: (
						<div className='flex flex-col'>
							{study.coordinator.name}
							<Text v='subtitle'>{study.coordinator.email}</Text>
						</div>
					),
					submissionDate: (
						<Text v='subtitle'>{new Date(study.submissionDate).toLocaleDateString()}</Text>
					),
					status: <IconBadge variant={study.status} />
				}))}
				isLoading={isLoading}
			/>
		</PageWrapper>
	)
}
