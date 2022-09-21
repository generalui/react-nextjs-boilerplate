import cn from 'classnames'
import { useEffect, useState } from 'react'
import { ApiQueryResults, ConditionInput } from 'types/QueryBuilder'
import { getQueryBuilderResults } from 'utils/requests/queryBuilder'
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
	const [results, setResults] = useState<ApiQueryResults | undefined>()

	const onFiltersChange = (filters: ConditionInput) => {
		setFilters(filters)
	}

	useEffect(() => {
		const getData = async () => {
			const test = await getQueryBuilderResults({ model, summaryModel, filters })
			setResults(test)
		}

		getData()
	}, [filters, model, summaryModel])

	return (
		<div className={cn(className, 'flex flex-col gap-6')} data-testid={testId}>
			<Filters fields={fields} conditions={conditions} onFiltersChange={onFiltersChange} />
			<Summary results={results} model={model} summaryModel={summaryModel} />
			<Results results={results?.list} model={model} summaryModel={summaryModel} />
		</div>
	)
}
