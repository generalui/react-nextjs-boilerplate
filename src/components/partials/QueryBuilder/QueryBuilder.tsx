import cn from 'classnames'
import { useEffect, useState } from 'react'
import { ConditionInput } from 'types/QueryBuilder'
import { useQueryBuilder } from 'hooks/api/queryBuilder/useQueryBuilder'
import { useRouterQuery } from 'hooks/useRouterQuery'
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
	transformField,
	testId = 'QueryBuilder'
}: QueryBuilderProps) => {
	const { query, update } = useRouterQuery()
	const [filters, setFilters] = useState<ConditionInput | undefined>()
	const [initialValues, setInitialValues] = useState<ConditionInput | undefined>()
	const { data: results } = useQueryBuilder({ model, summaryModel, filters })

	useEffect(() => {
		const getFilters: () => ConditionInput | undefined = () => {
			if (query) {
				// @ts-expect-error TODO: Fix this type
				const { field, condition, value } = query
				return {
					field: fields.find((f) => f.value === field) as ConditionInput['field'],
					condition: conditions.find((f) => f.value === condition) as ConditionInput['condition'],
					value
				}
			}
		}
		const newFilters = getFilters()
		setFilters(newFilters)
		// @ts-expect-error TODO: Fix this type
		if (!initialValues && query?.value) setInitialValues(newFilters)
	}, [conditions, fields, initialValues, query])

	const onFiltersChange = (filters: ConditionInput) => {
		update({
			field: filters.field.value,
			condition: filters.condition.value,
			value: filters.value
		})
	}

	return (
		<div className={cn(className, 'flex flex-col gap-6')} data-testid={testId}>
			<Filters
				transformField={transformField}
				fields={fields}
				conditions={conditions}
				onFiltersChange={onFiltersChange}
				initialValues={initialValues}
			/>
			<Summary results={results} model={model} summaryModel={summaryModel} />
			<Results results={results?.list} model={model} summaryModel={summaryModel} />
		</div>
	)
}
