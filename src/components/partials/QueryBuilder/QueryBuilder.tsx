import cn from 'classnames'
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
		<div className={cn(className, 'flex flex-col gap-6')} data-testid={testId}>
			<Filters fields={fields} conditions={conditions} />
			<Summary />
			<Results />
		</div>
	)
}
