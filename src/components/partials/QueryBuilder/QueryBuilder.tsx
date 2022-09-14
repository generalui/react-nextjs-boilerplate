import { Filters } from 'partials/QueryBuilder/Filters'
import { Results } from 'partials/QueryBuilder/Results'
import { Summary } from 'partials/QueryBuilder/Summary'
import { QueryBuilderProps } from './QueryBuilder.types'

export const QueryBuilder = ({ className, testId = 'QueryBuilder' }: QueryBuilderProps) => {
	return (
		<div className={className} data-testid={testId}>
			<Filters />
			<Summary />
			<Results />
		</div>
	)
}
