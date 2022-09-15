import { useText } from 'hooks/useText'
import { Condition } from 'partials/QueryBuilder/Condition'
import { Card } from 'common/Card'
import { FiltersProps } from './Filters.types'

export const Filters = ({ className, testId = 'Filters' }: FiltersProps) => {
	const { t } = useText('participants.filters')

	return (
		<div className={className} data-testid={testId}>
			<Card
				iconProps={{ icon: 'DocumentReportIcon' }}
				title={t('title')}
				headerClassName='pb-4 border-b'
			>
				<Condition />
			</Card>
		</div>
	)
}
