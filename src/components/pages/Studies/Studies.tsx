/*!
 * Studies page
 */
import Link from 'next/link'
import { useStudies } from 'hooks/api/useStudies'
import { useText } from 'hooks/useText'
import { CreateStudy } from 'partials/CreateStudy'
import { List } from 'partials/List'
import { PageWrapper } from 'partials/PageWrapper'
import { StatusBadge } from 'partials/StatusBadge'
import { PageHeader } from 'common/PageHeader'
import { Text } from 'common/Text'
import { StudiesProps } from './Studies.types'

export const Studies = function Studies({ testId = 'Studies' }: StudiesProps) {
	const { t } = useText('studies')
	const { data = [], isLoading } = useStudies()

	return (
		<PageWrapper title='Studies' testId={testId}>
			<PageHeader>
				<CreateStudy />
			</PageHeader>
			<List
				columns={[
					{
						key: 'image',
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
					image: (
						<div
							style={{
								backgroundImage: `url(${
									study?.image?.url || '/images/image_placeholder_centered.jpg'
								})`
							}}
							className='block h-16 w-16 bg-center bg-cover rounded-lg'
							role='img'
						/>
					),
					title: <Link href={`/studies/${study?.id}`}>{study?.title || 'Test'}</Link>,
					coordinator: (
						<div className='flex flex-col'>
							{study?.users?.[0]?.user?.name}
							<Text v='subtitle'>{study?.users?.[0]?.user?.email}</Text>
						</div>
					),
					submissionDate: <Text v='subtitle'>{new Date(study?.endDate).toLocaleDateString()}</Text>,
					status: <StatusBadge v={study?.status} />
				}))}
				isLoading={isLoading}
			/>
		</PageWrapper>
	)
}
