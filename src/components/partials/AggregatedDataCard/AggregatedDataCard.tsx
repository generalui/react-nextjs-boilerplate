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
		<Card title={title} className={cn(className)} testId={testId}>
			<h1 className={cn('font-bold text-3xl block', dataClassName)}>{dataValue}</h1>
			<h4 className='mb-2'>{subTitle}</h4>
			<p>{description}</p>
		</Card>
	)
}
