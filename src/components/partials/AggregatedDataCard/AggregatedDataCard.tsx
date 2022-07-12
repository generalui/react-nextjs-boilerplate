import cn from 'classnames'
import { Card } from 'common/Card'
import { AggregatedDataCardProps } from './AggregatedDataCard.types'

export const AggregatedDataCard = ({
	className,
	description,
	subTitle,
	testId = 'AggregatedDataCard',
	title,
	dataClassName,
	dataValue
}: AggregatedDataCardProps) => {
	return (
		<Card title={title} className={cn('flex flex-col justify-between', className)} testId={testId}>
			<div>
				<h1 className={cn('font-bold text-3xl block h-9', dataClassName)}>{dataValue}</h1>
				<h4 className='mb-2'>{subTitle}</h4>
				<p>{description}</p>
			</div>
		</Card>
	)
}
