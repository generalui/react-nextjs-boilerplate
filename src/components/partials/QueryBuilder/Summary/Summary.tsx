import { useEffect, useState } from 'react'
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
	const { t } = useText('common.queryBuilder')

	const aggregatedData = [
		{
			title: t(`models.${model}.plural`),
			dataClassName: 'text-green-400',
			value: results?.modelCount || 0,
			key: model
		}
		// {
		// 	title: t(`models.${summaryModel}.plural`),
		// 	dataClassName: 'text-primary',
		// 	value: studiesCount || results?.summaryModelCount,
		// 	key: summaryModel
		// }
	]

	// useEffect(() => {
	// 	const studies = results?.list?.reduce(
	// 		(studiesCount, result) => (studiesCount += result._count.studies),
	// 		0
	// 	)
	// }, [results])

	return (
		<div className={className} data-testid={testId}>
			<Card
				iconProps={{ icon: 'UserGroupIcon', wrapperClass: 'bg-green-400' }}
				title={t('summary.title')}
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
