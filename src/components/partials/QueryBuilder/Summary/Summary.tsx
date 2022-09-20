import { capitalizeFirstLetter, plural } from 'utils/client/text'
import { useText } from 'hooks/useText'
import { AggregatedDataCardGallery } from 'partials/AggregatedDataCardGallery'
import { Card } from 'common/Card'
import { SummaryProps } from './Summary.types'

export const Summary = ({
	className,
	results,
	model,
	summaryModel,
	testId = 'Summary'
}: SummaryProps) => {
	const { t } = useText('common.queryBuilder.summary')

	const aggregatedData = [
		{
			title: capitalizeFirstLetter(plural(model)),
			dataClassName: 'text-green-400',
			value: results?.modelCount,
			key: model
		},
		{
			title: capitalizeFirstLetter(plural(summaryModel)),
			dataClassName: 'text-primary',
			value: results?.summaryModelCount,
			key: summaryModel
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
					cardClassName='bg-gray-100 w-64 items-center'
					className='pt-4 flex justify-around'
				/>
			</Card>
		</div>
	)
}
