import { Filters } from './Filters'
import { QueryBuilderProps } from './QueryBuilder.types'
import { Results } from './Results'
import { Summary } from './Summary'

export const QueryBuilder = ({
	className,
	conditions,
	fields,
	testId = 'QueryBuilder'
}: QueryBuilderProps) => {
	return (
		<div className={className} data-testid={testId}>
			<Filters fields={fields} conditions={conditions} />
			<Summary />
			<Results />
		</div>
	)
}
