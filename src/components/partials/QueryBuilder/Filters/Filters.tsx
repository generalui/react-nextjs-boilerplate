import { useEffect, useState } from 'react'
import { FilterInputWithModel, FilterListItem, QueryBuilderModel } from 'types/QueryBuilder'
import { v4 as uuidv4 } from 'uuid'
import { useText } from 'hooks/useText'
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
	testId = 'Filters'
}: FiltersProps) => {
	const { t } = useText('queryBuilder.filters')
	const [fieldDataType, setFieldDataType] = useState<string | undefined>()
	const [fieldModel, setFieldModel] = useState<QueryBuilderModel | undefined>()
	const [filtersArray, setFiltersArray] = useState<FilterListItem[]>([])

	const getFiltersArray = (filters: FilterListItem[]) => {
		return filters
			.filter((filter) => !!filter?.filter)
			.map((filter) => ({ ...filter.filter } as FilterInputWithModel))
	}

	const updateFiltersArray = (filter: FilterInputWithModel, key: string) => {
		const filtersArrayCopy = [...filtersArray]
		const index = filtersArrayCopy.findIndex((item) => item.key === key)
		filtersArrayCopy[index].filter = filter
		setFiltersArray(filtersArrayCopy)

		onChange(getFiltersArray(filtersArrayCopy))
	}

	const handleAddRow = () => {
		setFiltersArray([...filtersArray, { key: uuidv4() }])
	}

	const handleRemoveFilter = (key: string) => {
		const newFilterArray = filtersArray.filter((f) => f.key !== key)
		setFiltersArray(newFilterArray)

		onChange(getFiltersArray(newFilterArray))
	}

	useEffect(() => {
		handleAddRow()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={className} data-testid={testId}>
			<Card
				iconProps={{ icon: 'DocumentChartBarIcon' }}
				title={t('title')}
				headerClassName='pb-4 border-b mb-0'
			>
				<div>
					<div className='pb-4'>
						<FiltersHeader />
						{filtersArray.map((filter, i) => {
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
									firstItem={i === 0}
									handleRemoveFilter={handleRemoveFilter}
								/>
							)
						})}
					</div>
					<div className='pl-3'>
						<Button v='xs' onClick={handleAddRow}>
							<Icon icon='PlusSmallIcon' />
							{t('add')}
						</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}
