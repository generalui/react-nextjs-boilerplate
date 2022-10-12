import { useText } from 'hooks/useText'
import { AggregatedDataCardGallery } from 'partials/AggregatedDataCardGallery'
import { Card } from 'common/Card'
import { SummaryProps } from './Summary.types'

export const Summary = ({ className, testId = 'Summary', dataSummaryCards }: SummaryProps) => {
	const { t } = useText('queryBuilder')

	return (
		<div className={className} data-testid={testId}>
			<Card
				iconProps={{ icon: 'UserGroupIcon', wrapperClass: 'bg-green-400' }}
				title={t('summary.title')}
				headerClassName='pb-4 border-b mb-0'
			>
				<AggregatedDataCardGallery
					aggregatedData={dataSummaryCards}
					cardClassName='bg-gray-100 w-64 items-center'
					className='pt-4 flex justify-around sm:flex-row'
				/>
			</Card>
		</div>
	)
}
