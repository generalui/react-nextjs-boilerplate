import { useState } from 'react'
import { FormSpy } from 'react-final-form'
import { FilterInput, FilterSchema, QueryBuilderModel } from 'types/QueryBuilder'
import { debounce } from 'utils/debounce'
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { Filter } from 'partials/QueryBuilder/Filter/Filter'
import { FiltersHeader } from 'partials/QueryBuilder/FiltersHeader'
import { Button } from 'common/Button'
import { Card } from 'common/Card'
import { Icon } from 'common/Icon'
import { FiltersProps } from './Filters.types'

export const Filters = ({
	className,
	fields,
	conditions,
	filterTypes,
	onChange,
	initialValues,
	testId = 'Filters'
}: FiltersProps) => {
	const { t } = useText('queryBuilder.filters')
	const [fieldDataType, setFieldDataType] = useState<string | undefined>()
	const [fieldModel, setFieldModel] = useState<QueryBuilderModel | undefined>()
	const [conditionsCount, setConditionsCount] = useState<number>(1)
	const [filtersArray, setFiltersArray] = useState<FilterInput[]>([])
	console.log('filtersArray: ', filtersArray)

	const updateFiltersArray = (filter: FilterInput) => {
		setFiltersArray([...filtersArray, filter])
	}

	const onSubmit = (filters: FilterInput) => {
		console.log('filters: ', filters)
		try {
			// const parsedFilters = FilterSchema.parse(filters)
			// onChange(parsedFilters, fieldModel, fieldDataType)
		} catch (error) {
			return
		}
	}

	const handleAddRow = () => {
		setConditionsCount((prev) => prev + 1)
	}

	return (
		<div className={className} data-testid={testId}>
			<Card
				iconProps={{ icon: 'DocumentChartBarIcon' }}
				title={t('title')}
				headerClassName='pb-4 border-b mb-0'
			>
				{/* <Form
					onSubmit={onSubmit}
					initialValues={initialValues}
					render={() => ( */}
				<div>
					<div className='pb-4'>
						<FiltersHeader />
						{Array.from({ length: conditionsCount }, (_, i) => i).map((i) => {
							return (
								<Filter
									key={i.toString()}
									fields={fields}
									conditions={conditions}
									filterTypes={filterTypes}
									onFieldTypeChange={setFieldDataType}
									onModelChange={setFieldModel}
									updateFiltersArray={updateFiltersArray}
								/>
							)
						})}
					</div>
					<Button v='xs' onClick={handleAddRow}>
						<Icon icon='PlusSmallIcon' />
						{t('add')}
					</Button>
				</div>
				{/* <FormSpy
								onChange={(props) => {
									debounce(() => onSubmit(props.values as FilterInput), 500, 'filters')()
								}}
							/>
				</div>
					)} */}
				{/* /> */}
			</Card>
		</div>
	)
}
