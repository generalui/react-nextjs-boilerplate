import cn from 'classnames'
import { useEffect, useState } from 'react'
import { Filter, FilterInput, OptionType, QueryBuilderModel } from 'types/QueryBuilder'
// import { useRouterQuery } from 'hooks/useRouterQuery'
import { useText } from 'hooks/useText'
import { List } from 'partials/List'
import { Column, ListData } from 'partials/List/List.types'
import { Card } from 'common/Card'
import { ItemsSelect } from 'common/SelectInput/SelectInput.types'
import { Filters } from './Filters'
import { QueryBuilderComponent } from './QueryBuilder.types'
import { Summary } from './Summary'
import { queryBuilderConditions, queryBuilderFilterTypes } from './queryBuilderConditions'

export const QueryBuilder: QueryBuilderComponent = ({
	className,
	fields,
	testId = 'QueryBuilder',
	title,
	columns,
	dataSummaryCards,
	results = { list: [] },
	onFilterChange
}) => {
	const { t } = useText('queryBuilder')
	// const { query, update } = useRouterQuery()
	// const [filters, setFilters] = useState<FilterInput>()
	const [conditions, setConditions] = useState<OptionType[]>([])
	// const [initialValues, setInitialValues] = useState<FilterInput>()
	// const [initialDataType, setInitialDataType] = useState<string>()

	useEffect(() => {
		setConditions(
			Object.entries(queryBuilderConditions).map(([key, value]) => {
				return {
					label: t(value.label.key),
					value: key,
					allowedFieldTypes: value.allowedFieldTypes
				}
			})
		)
	}, [t])

	// TODO: re-add query update
	// useEffect(() => {
	// 	if (query) {
	// 		// @ts-expect-error TODO: Fix this type
	// 		const { field, condition, value, dataType } = query
	// 		const filter = {
	// 			field: fields.find((f) => f.value === field) as FilterInput['field'],
	// 			condition: conditions.find((f) => f.value === condition) as FilterInput['condition'],
	// 			value
	// 		}
	// 		// setFilters(filter)
	// 		setInitialDataType(dataType)

	// 		// @ts-expect-error TODO: Fix this type
	// 		if (!initialValues && query?.value) setInitialValues(filter)
	// 	}
	// }, [conditions, fields, initialValues, query])

	const handleFilterChange = (
		filterValue: FilterInput[],
		model?: QueryBuilderModel,
		dataType?: string
	) => {
		console.log('filterValue: ', filterValue)
		const filters = filterValue.map((filter) => {
			return {
				field: filter.field.value,
				condition: filter.condition.value,
				value: typeof filter.value === 'string' ? filter.value : filter.value?.value,
				filterType: filter.filterType?.value,
				model,
				dataType
			}
		})

		onFilterChange?.(filters)
		// TODO: re-add query update
		// update(change)
	}

	const filterTypes: ItemsSelect = Object.entries(queryBuilderFilterTypes).map(([key, value]) => {
		return {
			label: t(value.key),
			value: key
		}
	})

	return (
		<div className={cn(className, 'flex flex-col gap-6')} data-testid={testId}>
			<Filters
				fields={fields}
				conditions={conditions}
				onChange={handleFilterChange}
				filterTypes={filterTypes}
				// initialValues={initialValues}
				// initialDataType={initialDataType}
			/>
			<Summary dataSummaryCards={dataSummaryCards} />
			<Card iconProps={{ icon: 'UserIcon', wrapperClass: 'bg-green-300' }} title={title}>
				<List
					columns={columns as unknown as Column<ListData>[]}
					data={results.list?.length ? results.list : []}
					indexKey='id'
					concise
				/>
			</Card>
		</div>
	)
}
