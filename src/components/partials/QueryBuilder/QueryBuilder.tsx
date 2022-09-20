import axios from 'axios'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { ConditionInput } from 'types/QueryBuilder'
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

	const onFiltersChange = (filters: ConditionInput) => {
		setFilters(filters)
	}

	useEffect(() => {
		const getData = async () => {
			const test = await axios.get('/api/query-builder', {
				params: { model, summaryModel, filters }
			})
			console.log('test: ', test)
			return test
		}

		if (filters) {
			getData()
		}
	}, [filters, model, summaryModel])

	return (
		<div className={cn(className, 'flex flex-col gap-6')} data-testid={testId}>
			<Filters fields={fields} conditions={conditions} onFiltersChange={onFiltersChange} />
			<Summary />
			<Results />
		</div>
	)
}
