import cn from 'classnames'
import { useState } from 'react'
import { ConditionInput } from 'types/QueryBuilder'
import { useQueryBuilder } from 'hooks/api/queryBuilder/useQueryBuilder'
import { Filters } from './Filters'
import { QueryBuilderProps } from './QueryBuilder.types'
import { Results } from './Results'
import { Summary } from './Summary'

export const QueryBuilder = ({
	className,
	conditions,
	fields,
	model,
	summaryModel,
	testId = 'QueryBuilder'
}: QueryBuilderProps) => {
	const [filters, setFilters] = useState<ConditionInput | undefined>()
	const { data: results } = useQueryBuilder({ model, summaryModel, filters })

	const onFiltersChange = (filters: ConditionInput) => {
		setFilters(filters)
	}

	return (
		<div className={cn(className, 'flex flex-col gap-6')} data-testid={testId}>
			<Filters fields={fields} conditions={conditions} onFiltersChange={onFiltersChange} />
			<Summary results={results} model={model} summaryModel={summaryModel} />
			<Results results={results?.list} model={model} summaryModel={summaryModel} />
		</div>
	)
}
