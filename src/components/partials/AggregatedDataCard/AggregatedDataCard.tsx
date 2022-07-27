import cn from 'classnames'
import { Card } from 'common/Card'
import { Text } from 'common/Text'
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
		<Card title={title} className={cn('flex flex-col gap-3', className)} testId={testId}>
			<div className='flex gap-3 items-center lg:items-start lg:flex-col'>
				<h1 className={cn('font-bold text-5xl', dataClassName)}>{dataValue}</h1>
				<Text className={'font-semibold text-gray-500 text-sm'}>{subTitle}</Text>
			</div>
			<Text v='subtitle'>{description}</Text>
		</Card>
	)
}
