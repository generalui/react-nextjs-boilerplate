import '__mocks__/index'
import { Filters } from './Filters'
import { QueryBuilderProps } from './QueryBuilder.types'
import { Results } from './Results'
import { Summary } from './Summary'

export const QueryBuilder = ({ className, testId = 'QueryBuilder' }: QueryBuilderProps) => {
	return (
		<div className={className} data-testid={testId}>
			<Filters />
			<Summary />
			<Results />
		</div>
	)
}
