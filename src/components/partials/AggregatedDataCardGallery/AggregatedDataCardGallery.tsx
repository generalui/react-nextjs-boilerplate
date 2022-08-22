import cn from 'classnames'
import { AggregatedDataCard } from 'partials/AggregatedDataCard/AggregatedDataCard'
import { AggregatedDataCardGalleryProps } from './AggregatedDataCardGallery.types'

export const AggregatedDataCardGallery = ({
	className,
	testId = 'AggregatedDataCardGallery',
	aggregatedData
}: AggregatedDataCardGalleryProps) => {
	return (
		<div className={cn('flex flex-col lg:flex-row gap-6', className)} data-testid={testId}>
			{aggregatedData.map(({ title, dataClassName, value, key, subTitle, description }) => (
				<AggregatedDataCard
					key={key}
					className='col-span-3 lg:col-span-1'
					title={title}
					dataClassName={dataClassName}
					value={value}
					subTitle={subTitle}
					description={description}
				/>
			))}{' '}
		</div>
	)
}
