import { useEffect, useState } from 'react'
import { FormSpy } from 'react-final-form'
import { FilterInput, FilterListItem, FilterSchema, QueryBuilderModel } from 'types/QueryBuilder'
import { v4 as uuidv4 } from 'uuid'
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
	const [filtersArray, setFiltersArray] = useState<FilterListItem[]>([])
	console.log('filtersArray: ', filtersArray)

	const updateFiltersArray = (filter: FilterInput, key: string) => {
		const filtersArrayCopy = [...filtersArray]
		const index = filtersArrayCopy.findIndex((item) => item.key === key)
		filtersArrayCopy[index].filter = filter
		setFiltersArray(filtersArrayCopy)
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
		setFiltersArray([...filtersArray, { key: uuidv4() }])
	}

	useEffect(() => {
		handleAddRow()
	}, [])

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
						{filtersArray.map((filter) => {
							return (
								<Filter
									key={filter.key}
									filterKey={filter.key}
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
