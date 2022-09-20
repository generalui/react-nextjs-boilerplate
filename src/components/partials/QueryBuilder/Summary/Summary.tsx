import { useText } from 'hooks/useText'
import { AggregatedDataCardGallery } from 'partials/AggregatedDataCardGallery'
import { Card } from 'common/Card'
import { SummaryProps } from './Summary.types'

export const Summary = ({ className, testId = 'Summary' }: SummaryProps) => {
	const { t } = useText('common.queryBuilder.summary')

	const aggregatedData = [
		{
			title: 'test',
			dataClassName: 'text-primary',
			value: 100
		},
		{
			title: 'test',
			dataClassName: 'text-primary',
			value: 100
		}
	]

	return (
		<div className={className} data-testid={testId}>
			<Card
				iconProps={{ icon: 'UserGroupIcon', wrapperClass: 'bg-green-400' }}
				title={t('title')}
				headerClassName='pb-4 border-b mb-0'
			>
				<AggregatedDataCardGallery
					aggregatedData={aggregatedData}
					cardClassName='bg-gray-200 w-64 items-center'
					className='pt-4 flex justify-around'
				/>
			</Card>
		</div>
	)
}
