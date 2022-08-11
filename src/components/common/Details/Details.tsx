import cn from 'classnames'
import { Detail } from './Detail'
import { DetailsProps } from './Details.types'

export const Details = ({ className, details, testId = 'Details' }: DetailsProps) => {
	return (
		<div className={cn('flex flex-col gap-2', className)} data-testid={testId}>
			{details.map(({ title, value }) => (
				<Detail title={title} value={value} key={title} />
			))}
		</div>
	)
}
